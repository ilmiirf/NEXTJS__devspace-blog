import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gray-900 text-gray-100 shadow-w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <div className="flex title-font font-medium items-center text-white mb-4 md:justify-start md:w-1/5 md:mb-0">
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
            <span className="ml-3 tetx-xl">DevSpace</span>
          </div>
        </Link>
        <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto">
          <Link
            href="/blog"
            className="mx-5 cursor-pointer uppercase hover:text-indigo-300"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="mx-5 cursor-pointer uppercase hover:text-indigo-300"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
