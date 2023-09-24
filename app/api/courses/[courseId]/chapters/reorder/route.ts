import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type IParams = {
  params: {
    courseId: string;
  };
};

export async function PUT(req: Request, { params }: IParams) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 400 });

    const { list } = await req.json();

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 400 });

    for (let item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[COURSEID/CHAPTERS/REORDER]", { error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
