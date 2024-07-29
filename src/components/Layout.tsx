import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  keywords?: string;
  description?: string;
};

const Layout = ({ children, title, keywords, description }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Search />
      <main className="container mx-auto my-7 text-gray-900 ">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "devspace, nextjs, development, coding",
  description: "The best info and news in develop",
};

export default Layout;
