import { FrontmatterType } from "@/types/post";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Link from "next/link";
import Layout from "@/components/Layout";
import CategoryLabel from "@/components/CategoryLabel";
import { marked } from "marked";

type PostType = {
  frontmatter: FrontmatterType;
  content: string;
  slug: string;
};

const PostPage = ({ frontmatter, content, slug }: PostType) => {
  const { title, cover_image, date, author, author_image } = frontmatter;

  return (
    <Layout title={title}>
      <Link href="/blog" className="mb-4">
        Back to Blog
      </Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel category={frontmatter.category} />
        </div>
        <img src={cover_image} alt="" className="w-full rounded-lg" />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt=""
              className="w-12 h-12 object-cover rounded-full align-middle border-none"
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {author}
            </p>
          </div>
          <div className="mr-4">{date.toString()}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("src/pages/posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/pages/posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
