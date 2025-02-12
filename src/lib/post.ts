import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils";

const files = fs.readdirSync(path.join("src/pages/posts"));

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("src/pages/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return posts.sort(sortByDate);
}
