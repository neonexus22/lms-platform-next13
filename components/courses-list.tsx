import { CourseWithProgressWithCategory } from "@/actions/get-courses";
import React from "react";

type CoursesListProps = {
  items: CourseWithProgressWithCategory[];
};

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default CoursesList;
