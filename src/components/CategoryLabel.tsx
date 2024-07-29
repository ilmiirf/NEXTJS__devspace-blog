import React from "react";
import Link from "next/link";
import cn from "classnames";

const CategoryLabel = ({ category }: { category: string }) => {
  return (
    <div
      className={cn("px-2 py-1 text-gray-100 rounded-lg font-bold", {
        "bg-yellow-600": category === "JavaScript",
        "bg-blue-600": category === "CSS",
        "bg-green-600": category === "Python",
        "bg-purple-600": category === "PHP",
        "bg-red-600": category === "Ruby",
      })}
    >
      <Link href={`/blog/category/${category.toLowerCase()}`}>{category}</Link>
    </div>
  );
};

export default CategoryLabel;
