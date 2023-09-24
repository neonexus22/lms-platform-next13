"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({
  item,
  onEdit,
}: {
  item: Chapter;
  onEdit: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
        item.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
      )}
    >
      <div
        className={cn(
          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
          item.isPublished && "border-r-sky-200 hover:bg-sky-200"
        )}
      >
        <Grip className="h-5 w-5" />
      </div>
      {item.title}
      <div className="ml-auto pr-2 flex items-center gap-x-2 z-50">
        {item.isFree && <Badge>Free</Badge>}
        <Badge className={cn("bg-slate-500", item.isPublished && "bg-sky-700")}>
          {item.isPublished ? "Published" : "Draft"}
        </Badge>
        <Pencil
          onClick={() => {
            onEdit(item.id);
          }}
          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
        />
      </div>
    </div>
  );
};

type ChaptersListProps = {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
};

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [chapters, setChapters] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    setChapters(items);
  }, [items]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over?.id || active.id === over?.id) return;

    const items = Array.from(chapters);
    const sourceIndex = active.data.current?.sortable.index;
    const destinationIndex = over.data.current?.sortable.index;

    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);

    const startIndex = Math.min(sourceIndex, destinationIndex);
    const endIndex = Math.max(sourceIndex, destinationIndex);
    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id) + 1,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={chapters}
          strategy={verticalListSortingStrategy}
        >
          {chapters.map((item) => (
            <SortableItem key={item.id} item={item} onEdit={onEdit} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ChaptersList;
