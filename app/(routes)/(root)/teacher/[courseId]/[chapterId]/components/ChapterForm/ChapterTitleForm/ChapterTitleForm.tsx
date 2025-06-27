"use client";
import { ChapterTitleFormProps } from "./ChapterTitleForm.type";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { formSchema } from "./ChapterTitleForm.form";
import { EditorDescription } from "@/components/Shared";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ChapterTitleForm(props: ChapterTitleFormProps) {
  const { courseId, chapter } = props;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: chapter.title || "",
      description: chapter.description || "",
      isFree: chapter.isFree || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        title: values.title,
        description: values.description,
        isFree: values.isFree,
      });
      toast("Capítulo actualizado");
      router.refresh();
    } catch (error) {
      toast.error("Error al actualizar el capítulo");
      console.log(error);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-md mx-auto mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Capítulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Introducción a Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="m-0">Capítulo público</FormLabel>
                    <FormDescription className="text-sm text-muted-foreground">
                      Si quieres que el capítulo sea visible para todos los
                      usuarios
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del Capítulo</FormLabel>
                <FormControl>
                  <EditorDescription
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="px-20 mt-10 cursor-pointer">
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
}
