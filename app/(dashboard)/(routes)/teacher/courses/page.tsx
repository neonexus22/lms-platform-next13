import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const CoursesPage = (props: Props) => {
  return (
    <div className="p-6">
      <Link href="/teacher/create" className={buttonVariants()}>
        New Course
      </Link>
    </div>
  );
};

export default CoursesPage;
