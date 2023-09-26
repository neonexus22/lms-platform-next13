import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type Props = {};

const CoursesPage = async (props: Props) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
