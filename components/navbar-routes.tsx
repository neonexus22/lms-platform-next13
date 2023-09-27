"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

type Props = {};

const NavbarRoutes = (props: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link
            href="/"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <LogOut className="h-4 w-4 mr-2" /> Exit
          </Link>
        ) : (
          <Link
            href="/teacher/courses"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Teacher Mode
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
