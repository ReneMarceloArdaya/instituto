"use client";
import {
  GripVertical,
  ListCheck,
  Loader2,
  Pencil,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { TitleBlock } from "../TitleBlock";
import { ChaptersBlockProps } from "./ChaptersBlock.type";
import { useEffect, useState } from "react";
import { FormChapterName } from "./FormChapterName";

import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";


export function ChaptersBlock(props: ChaptersBlockProps) {
  const { idCourse, chapters } = props;
  const [chapterList, setchapterList] = useState(chapters ?? []);
  const [showInputChapter, setShowInputChapter] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setchapterList(chapters ?? []);
  }, [chapters]);

  const onEditChapter = (chapterId: string) => {
    router.push(`/teacher/${idCourse}/${chapterId}`);
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapterList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setchapterList(items);

    const bulkupdate = items.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));
    onReorder(bulkupdate);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
        list: updateData,
      });

      toast("Capítulos actualizados");
      router.refresh();
    } catch {
      toast.error("Error al actualizar los capítulos");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md h-fit relative">
      <TitleBlock tittle="Capítulos del Curso" icon={ListCheck} />

      <div className="flex gap-2 items-center justify-between mb-3">
        <h3 className="text-xl font-semibold"></h3>
        <p>Capítulos disponibles</p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInputChapter(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Crear Capítulo
        </Button>
      </div>
      {showInputChapter && (
        <FormChapterName
          setShowInputChapter={setShowInputChapter}
          idCourse={idCourse}
        />
      )}

      {isUpdating && (
        <div
          className="absolute top-0 right-0 flex items-center justify-center
       w-full h-full bg-black/50"
        >
          <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapter">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-2"
            >
              {chapterList?.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex gap-2 items-center bg-slate-100 rounded-md py-2 px-4 text-sm justify-between"
                    >
                      <div className="flex gap-2 items-center">
                        <GripVertical className="w-4 h-4 text-gray-500" />
                        <p>{chapter.title}</p>
                      </div>
                      <div className="flex gap-2 items-center px-2 py-1">
                        {chapter.isPublished ? (
                          <span className="inline-block bg-emerald-100 text-emerald-600 text-md font-medium px-2 pt-1 rounded-md mt-1">
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-block bg-gray-100 text-gray-600 text-md font-medium px-3 py-1 rounded-lg">
                            No publicado
                          </span>
                        )}
                        <div
                          className="cursor-pointer"
                          onClick={() => onEditChapter(chapter.id)}
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
