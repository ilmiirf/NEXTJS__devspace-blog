import Link from "next/link";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { PostType } from "@/types/post";
import { getPosts } from "@/lib/post";

type HomeProps = {
  posts: PostType[];
};

export default function HomePage({ posts }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
      <div className="grid md:grid-col-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link
        href="/blog"
        className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
      >
        All Post
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { posts: getPosts().slice(0, 6) },
  };
}
