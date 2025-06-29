"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { searchCourses } from "@/actions/searchCourses";
import { SearchFormClient } from "../SharedCourse";
import { ListCourses } from "@/components/Shared";



export function ExploreCourse() {
  const [courses, setCourses] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = async (term?: string) => {
    setIsLoading(true);
    try {
      const result = await searchCourses(term);
      setCourses(result);
    } catch (error) {
      console.error("Error al buscar cursos:", error);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
    <div className="my-6">
      <div className="mx-4">
        <div className="border rounded-xl bg-white shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
            <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Explora Nuestros Cursos
              </h1>
              <p className="text-lg text-gray-600">
                Encuentra la formación que necesitas para impulsar tu carrera.
                Cursos diseñados por expertos y adaptados a tu ritmo.
              </p>
              <SearchFormClient onSearch={fetchCourses} isLoading={isLoading} />
            </div>

            <div className="relative hidden md:block">
              <Image
                src="/HeroCurses.png"
                alt="Estudiante aprendiendo en línea con una laptop"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ListCourses title="Cursos" courses={courses}/>
    </>
  );
}
