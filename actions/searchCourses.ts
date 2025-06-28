'use server';

import prisma from '@/lib/prisma';
import { Course, Chapter } from '@prisma/client';

export async function searchCourses(
  searchTerm: string = ''
): Promise<(Course & { chapters: Chapter[] })[] | null> {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        ...(searchTerm && {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return null;
  }
}