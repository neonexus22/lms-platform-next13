"use client";

import ConfirmModal from "@/components/models/confirm-modal";
import { TooltipContainer } from "@/components/tooltip-container";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type ChapterActionsProps = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

const ChapterActions: React.FC<ChapterActionsProps> = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted!");
      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        onClick={() => {}}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} size="icon">
          <TooltipContainer text="Delete this chapter!">
            <Trash className="w-4 h-4" />
          </TooltipContainer>
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
