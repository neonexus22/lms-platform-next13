import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type IParams = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

export async function PATCH(req: Request, { params }: IParams) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 400 });

    const { isPublished, ...values } = await req.json();

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!ownCourse) return new NextResponse("Unauthorized", { status: 400 });

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // TODO: Handle video upload

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("COURSE/COURSE_ID/CHAPTERS/CHAPTER_ID/PATCH", { error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
