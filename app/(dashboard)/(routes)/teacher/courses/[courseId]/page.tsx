import IconBadge from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Course } from "@prisma/client";
import { LayoutDashboard } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";
import TitleForm from "./_components/title-form";

type Props = {
  params: {
    courseId: string;
  };
};

const CourseIdPage: FC<Props> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  let course: Course | null = null;
  try {
    course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
  } catch (error) {
    notFound();
  }

  if (!course) return redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
