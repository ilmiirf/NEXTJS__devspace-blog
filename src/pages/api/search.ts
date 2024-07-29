// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PostType } from "@/types/post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let posts;
  if (process.env.NODE_ENV === "production") {
    // @todo
  } else {
    const files = fs.readdirSync(path.join("src/pages/posts"));
    posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("src/pages/posts", filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);
      return {
        slug: filename.replace(".md", ""),
        frontmatter,
      };
    });
  }
  console.log(posts);

  const results = posts!.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  console.log(results);
  res.status(200).json({ results });
}
