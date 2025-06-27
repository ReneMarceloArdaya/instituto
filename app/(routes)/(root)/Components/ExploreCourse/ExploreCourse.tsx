"use client";
import Image from "next/image";
import { Search } from "lucide-react";


export function ExploreCourse() {



  return (
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

              <div className="mt-4 relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busca por curso..."
                  className="w-full pl-12 pr-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
              </div>
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
  );
}
