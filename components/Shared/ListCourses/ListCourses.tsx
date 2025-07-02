"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ListCoursesProps } from "./ListCourses.type";
import { Button } from "@/components/ui/button";
import { IconBadge } from "../IconBadge";
import {
  Book,
  ChartNoAxesColumn,
  Loader2,
  MapPin,
  Monitor,
} from "lucide-react";
import { ProgressCourses } from "./ProgressCourses/ProgressCourses";




const COURSES_PER_PAGE = 20;

export function ListCourses(props: ListCoursesProps) {
  const { title, courses } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalCourses = courses?.length ?? 0;
  const totalPages = Math.ceil(totalCourses / COURSES_PER_PAGE);

  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const currentCourses = courses?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="my-4 mx-6 border rounded-lg bg-white p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

      <div className="border-b-[1px] py-2">
        {!courses ? (
          <div className="flex justify-center items-center mt-10 text-violet-500">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : currentCourses && currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {currentCourses.map((course) => (
              <Link
                href={`/courses/${course.slug}`}
                key={course.id}
                className="border rounded-lg relative transition-shadow hover:shadow-lg shadow-violet-300/40 shadow-md"
              >
                <span
                  className="absolute top-2 right-2 z-1 px-2 pt-1 bg-white text-violet-500
                font-medium rounded-ful text-xs shadow-md"
                >
                  {course.category || "Sin categoria"}
                </span>

                <div className="w-full h-[180px] relative">
                  <Image
                    src={course.imageUrl || "/Defaul_Img.png"}
                    alt="Imagen del curso"
                    fill
                    className="object-cover 
                  object-center rounded-t-lg"
                    sizes="(max-width: 500px) 100vw 1200px"
                  />
                </div>
                
                <div className="p-2">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 justify-between mt-2">
                    <IconBadge
                      icon={Book}
                      text={`${course.chapters.length} Capítulos`}
                    />
                    <IconBadge
                      icon={ChartNoAxesColumn}
                      text={course.level || ""}
                    />
                    <IconBadge
                      text={
                        course.TypeCourse
                          ? course.TypeCourse.charAt(0).toUpperCase() +
                            course.TypeCourse.slice(1)
                          : ""
                      }
                      icon={
                        course.TypeCourse === "presencial" ? MapPin : Monitor
                      }
                    />
                  </div>
                  <ProgressCourses
                    courseId={course.id}
                    totalChapters={course.chapters.length}
                    price={course.price}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No hay cursos disponibles
          </p>
        )}
      </div>

      {/* Navegación de páginas */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
}
