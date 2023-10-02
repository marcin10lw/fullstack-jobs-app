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

  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        className={`btn page-btn ${activeClass ? "active" : ""}`}
        key={pageNumber}
        onClick={() => {
          setPage(pageNumber);
          scrollToJobs();
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderButtons = (): JSX.Element[] => {
    const pageButtons = [];

    pageButtons.push(
      addPageButton({
        pageNumber: 1,
        activeClass: currentPage === 1,
      })
    );

    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    if (currentPage < numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

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
      <div className="btn-container">{renderButtons()}</div>
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
