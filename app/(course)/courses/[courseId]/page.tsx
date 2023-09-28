import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type CourseIdPageProps = {
  params: {
    courseId: string;
  };
};

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  return redirect(`/courses/${course.id}/chapters/${course.chapters?.[0].id}`);
};

export default CourseIdPage;