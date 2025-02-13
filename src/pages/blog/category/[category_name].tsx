import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { PostType } from "@/types/post";
import { getPosts } from "@/lib/post";
import CategoryList from "@/components/CategoryList";

type CategoryBlogProps = {
  posts: PostType[];
  categoryName: string;
  categories: string[];
};

export default function CategoryBlogPage({
  posts,
  categoryName,
  categories,
}: CategoryBlogProps) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {categoryName}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
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

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("src/pages/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    const category = frontmatter.category.toLowerCase();

    return category;
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }: any) {
  console.log(category_name);
  const files = fs.readdirSync(path.join("src/pages/posts"));

  const posts = getPosts();

  const categories = posts.map((post) =>
    post.frontmatter.category.toLowerCase()
  );

  const uniqueCategories: string[] = Array.from(new Set(categories));

  // Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
