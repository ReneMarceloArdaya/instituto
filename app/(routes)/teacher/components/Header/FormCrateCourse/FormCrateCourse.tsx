"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./FormCrateCourse.form";
import { toast } from "sonner";

export function FormCrateCourse() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      slug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/course", values);
      toast.success("Curso creado correctamente");
      router.push(`/teacher/${res.data.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el curso");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Curso</FormLabel>
              <FormControl>
                <Input placeholder="Curso de NodeJs" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>slug del curso</FormLabel>
              <FormControl>
                <Input placeholder="curso-nodejs" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Curso</Button>
      </form>
    </Form>
  );
}
