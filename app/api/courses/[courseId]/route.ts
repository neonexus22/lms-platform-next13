import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

type IParams = {
  params: {
    courseId: string;
  };
};

export async function DELETE(req: Request, { params }: IParams) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) return new NextResponse("Not found", { status: 404 });

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID/DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: IParams) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = params;
    if (!courseId)
      return new NextResponse("Course Id is required", { status: 400 });

    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID/PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
