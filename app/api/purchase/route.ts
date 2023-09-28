import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { userId: currentUserId, courseId } = await req.json();

    if (userId !== currentUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) return new NextResponse("Bad request", { status: 404 });

    await db.purchase.create({
      data: {
        userId,
        courseId,
      },
    });

    return new NextResponse("OK");
  } catch (error: any) {
    console.log("[PURCHASE ROUTE]", { error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
