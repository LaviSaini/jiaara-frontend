'use client';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


export default function Pagination({
  totalPages = 0,
  currentPage = 1,
  setCurrentPage = () => {}
}) {

  const isSelectedPage = page => {
    return page == currentPage;
  }

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  }

  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
  }

  const isFirstPage = page => {
    return page == 1;
  }

  const isLastPage = page => {
    return page == totalPages;
  }


  return (
    <div className="pagination flex flex-wrap justify-center items-center gap-0.5 px-5">
      <button
        className={`
          px-2 py-2 border
          border-primaryFont bg-transparent text-primaryFont
          ${isFirstPage(currentPage) && "opacity-50"}
          xs:px-3 xs:py-2
        `}
        onClick={prevPage}
        disabled={isFirstPage(currentPage)}
      >
        {<IoIosArrowBack/> || '<'}
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={index}
            className={`
              px-2 py-1 border
              ${isSelectedPage(page) ?
                "bg-primaryFont text-white" :
                "bg-transparent text-primaryFont"
              }
              border-primaryFont
              xs:px-4 xs:py-1
            `}
            onClick={() => {console.log("HELO HELO",page);setCurrentPage(page)}}
            disabled={isSelectedPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`
          px-2 py-2 border 
          border-primaryFont bg-transparent text-primaryFont
          ${isLastPage(currentPage) && "opacity-50"}
          xs:px-3 xs:py-2
        `}
        onClick={nextPage}
        disabled={isLastPage(currentPage)}
      >
        {<IoIosArrowForward/> || '>'}
      </button>
    </div>
  );
}
