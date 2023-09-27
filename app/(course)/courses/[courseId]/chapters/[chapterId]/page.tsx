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

  const response = await getChapter({ userId, courseId, chapterId });

  // if (!response?.chapter || !course) return redirect("/");

  return <div>ChapterIdPage</div>;
};

export default ChapterIdPage;
