import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import { PostType } from "@/types/post";
import { POST_PER_PAGE } from "@/config";
import { getPosts } from "@/lib/post";
import CategoryList from "@/components/CategoryList";

type BlogProps = {
  posts: PostType[];
  numPages: number;
  currentPage: number;
  categories: string[];
};

export default function BlogPage({
  posts,
  numPages,
  currentPage,
  categories,
}: BlogProps) {
  return (
    <Layout>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("src/pages/posts"));

  const numPages = Math.ceil(files.length / POST_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join("src/pages/posts"));

  const posts = getPosts();
  const categories = posts.map((post) =>
    post.frontmatter.category.toLowerCase()
  );

  const uniqueCategories: string[] = Array.from(new Set(categories));

  console.log(uniqueCategories);

  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;

  const orderedPosts = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
