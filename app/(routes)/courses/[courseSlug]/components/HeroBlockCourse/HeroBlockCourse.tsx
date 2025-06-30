"use client";
import { useRouter } from "next/navigation";
import { HeroBlockCourseProps } from "./HeroBlockCourse.type";
import { IconBadge } from "@/components/Shared";
import { Calendar, ChartNoAxesColumn, Timer } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/formarPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";


export function HeroBlockCourse(props: HeroBlockCourseProps) {
  const { course, purchaseCourse } = props;
  const {
    id,
    title,
    description,
    price,
    imageUrl,
    level,
    chapters,
    updatedAt,
    slug
  } = course;

  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const enrollCourse = async () => {
    setIsLoading(true);
    console.log("price:", price);
    if(price === "Gratis"){
        try {
            await axios.post(`/api/course/${id}/enroll`);
            toast("Inscripción exitosa");
            router.push(`/courses/${slug}/${chapters[0].id}`);
        } catch (error) {
            toast.error("Error al inscribir");
            console.error("Error al inscribir:", error); 
        }
        finally{
            setIsLoading(true);
        }
    }
    
  }

  const redirectToCourse = () => {
    router.push(`/courses/${slug}/${chapters[0].id}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-balance mt-2">{description}</p>

        <div className="flex flex-col gap-3 mt-5 text-gray-600">
          <IconBadge icon={Timer} text="7h 40min" />
          <IconBadge
            icon={Calendar}
            text={`Ultima actualización: ${new Date(
              updatedAt
            ).toLocaleDateString("es-BO")}`}
          />
          <IconBadge icon={ChartNoAxesColumn} text={level || ""} />
        </div>
        <h2 className="text-xl font-semibold my-4">{formatPrice(price)}</h2>

        {
            purchaseCourse ? (
                <Button className="hover:bg-violet-400 text-white font-semibold"
                    disabled={isLoading}
                    onClick={redirectToCourse}
                >
                    Ver Curso
                </Button>
            ):(
                <Button className="hover:bg-violet-400 text-white font-semibold"
                    disabled={isLoading}
                    onClick={enrollCourse}
                >
                    Inscribirse Ahora
                </Button>
            )
        }
      </div>
      <Image src={imageUrl || "/Default_Img.png"} alt={title} width={400} height={400} className="rounded-md" />

    </div>
  );
}
