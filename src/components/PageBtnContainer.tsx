import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import { Wrapper } from "src/assets/wrappers/PageBtnContainer";

type PageBtnContainerProps = {
  numOfPages: number;
  currentPage: number;
  setPage: (pageNumber: number) => void;
  scrollToJobs: () => void;
};

const PageBtnContainer = ({
  currentPage,
  numOfPages,
  setPage,
  scrollToJobs,
}: PageBtnContainerProps) => {
  let pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const toPrevPage = () => {
    if (currentPage <= 1) {
      return;
    }

    setPage(currentPage - 1);
    scrollToJobs();
  };

  const toNextPage = () => {
    if (currentPage >= numOfPages) {
      return;
    }

    setPage(currentPage + 1);
    scrollToJobs();
  };

  return (
    <Wrapper>
      <button
        onClick={toPrevPage}
        className="btn prev-btn"
        disabled={currentPage <= 1}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn ${pageNumber === currentPage ? "active" : ""}`}
              key={pageNumber}
              onClick={() => {
                setPage(pageNumber);
                scrollToJobs();
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        onClick={toNextPage}
        className="btn next-btn"
        disabled={currentPage >= numOfPages}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
