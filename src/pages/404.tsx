import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/images/logo.png"
          width={70}
          height={70}
          alt=""
          className="bg-gray-800 rounded-2xl"
        />
        <h1 className="text-6xl my-5">Whoops!</h1>
        <h2 className="text-4xl text-gray-400 mb-5">This Page Doesnt Exist</h2>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
