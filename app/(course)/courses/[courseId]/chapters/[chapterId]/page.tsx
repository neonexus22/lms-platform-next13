import { getChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type ChapterIdPageProps = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { courseId, chapterId } = params;
  const { userId } = auth();
  if (!userId) return redirect("/");

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({ userId, courseId, chapterId });

  if (!chapter || !course) return redirect("/");

  return <div>ChapterIdPage</div>;
};

export default ChapterIdPage;
