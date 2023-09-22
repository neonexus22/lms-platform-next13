import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type IParams = {
  params: {
    courseId: string;
    attachmentId: string;
  };
};

export async function DELETE(req: Request, { params }: IParams) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId, attachmentId } = params;
    if (!courseId || !attachmentId) {
      return new NextResponse("Course Id / Attachment Id are required", {
        status: 400,
      });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.deleteMany({
      where: {
        id: attachmentId,
        courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID_DELETE", { error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
