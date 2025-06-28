"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { formSchema } from "./CourseForm.form";
import { Cog } from "lucide-react";
import { TitleBlock } from "..";
import { CourseFormProps } from "./CourseForm.type";

export function CourseForm(props: CourseFormProps) {
  const { course } = props;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || "",
      slug: course.slug || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "",
    },
  });

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      axios.patch(`/api/course/${course.id}`, values);
      toast.success("Información actualizada");
      router.refresh();
    } catch{
      toast.error("Error al actualizar información");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md">
      <TitleBlock tittle="Configuración del curso" icon={Cog} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo de Curso</FormLabel>
                  <FormControl>
                    <Input placeholder="Curso de ..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Esto es lo que el usuario verá como titulo del curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url del Curso</FormLabel>
                  <FormControl>
                    <Input placeholder="curso-react..." {...field} readOnly className="text-gray-500" />
                  </FormControl>
                  <FormDescription>
                    Es unica y no se puede modificar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Fullstack">Fullstack</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="IoT">IoT</SelectItem>
                      <SelectItem value="Devops">Devops</SelectItem>
                      <SelectItem value="Data">Data</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Arquitectura">Arquitectura</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel del Curso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel del curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Principiante">Principiante</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Pon la descripción del curso aquí"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Descripción completa del curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Guardar Información Básica</Button>
        </form>
      </Form>
    </div>
  );
}
