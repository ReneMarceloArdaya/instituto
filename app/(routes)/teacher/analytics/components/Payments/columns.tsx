"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export type PurchaseWithCourse = {
  id: string;
  userId: string;
  userEmail: string;
  courseId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  course: {
    title: string;
    slug: string;
    imageUrl: string;
    price: string;
  };
};

export const columns: ColumnDef<PurchaseWithCourse>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha de compra",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString("es-BO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return <div className="text-sm text-muted-foreground">{date}</div>;
    },
  },
  {
    accessorKey: "userEmail",
    header: "Cliente",
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original.userEmail}</div>
    ),
  },
  {
    accessorKey: "course",
    header: "Curso",
    cell: ({ row }) => {
      const course = row.original.course;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col">
            <Link
              href={`/courses/${course.slug}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {course.title}
            </Link>
            <span className="text-xs text-muted-foreground">{course.slug}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio Bs",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs px-2 py-1">
        Bs {row.original.price.toFixed(2)}
      </Badge>
    ),
  },
];
