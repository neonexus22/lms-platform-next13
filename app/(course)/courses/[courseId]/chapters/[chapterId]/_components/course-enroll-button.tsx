"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type CourseEnrollButtonProps = {
  userId: string;
  courseId: string;
  price: number;
};

const CourseEnrollButton = ({
  courseId,
  price,
  userId,
}: CourseEnrollButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/purchase", {
        userId,
        courseId,
      });
      toast.success("Course purchased!");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className="w-full md:w-auto"
      size="sm"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
