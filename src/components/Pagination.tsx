import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  numPages: number;
};

const Pagination = ({ currentPage, numPages }: PaginationProps) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;
  return (
    <div className="mt-6 ">
      <ul className="flex pl-0 list-none my-2 ">
        {!isFirst && (
          <Link href={prevPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-700 border-r-0 ml-0 rounded-l hover:bg-gray-200">
              Previous
            </li>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`} key={i}>
            <li
              className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-700 border-r-0 ml-0 rounded-l hover:bg-gray-200 ${
                currentPage === i + 1 && "bg-gray-200"
              }`}
            >
              {i + 1}
            </li>
          </Link>
        ))}
        {!isLast && (
          <Link href={nextPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-700 border-r-0 ml-0 rounded-l hover:bg-gray-200">
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
