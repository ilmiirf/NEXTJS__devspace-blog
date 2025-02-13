import Link from "next/link";
import Image from "next/image";
import CategoryLabel from "./CategoryLabel";

type PostProps = {
  post: any;
  compact?: boolean;
};

const Post = ({ post, compact }: PostProps) => {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          alt=""
          width={600}
          height={420}
          className="mb-4 rounded-lg"
        />
      )}

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel category={post.frontmatter.category} />
      </div>
      <div className="mt-2">
        <Link
          href={`/blog/${post.slug}`}
          className="text-2xl text-gray-700 font-bold hover:underline"
        >
          {post.frontmatter.title}
        </Link>
        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 hover:text-blue-600"
          >
            Read More
          </Link>
          <div className="flex items-center">
            <img
              src={post.frontmatter.cover_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h3 className="text-gray-700 font-bold">
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
