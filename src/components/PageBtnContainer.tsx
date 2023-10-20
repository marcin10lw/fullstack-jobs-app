import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

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
  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        className={`btn h-[40px] w-[50px] rounded-[--border-radius] text-xl font-bold ${
          activeClass
            ? 'bg-[--primary-500] text-[--white]'
            : 'bg-transparent text-[--primary-500]'
        }`}
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
      }),
    );

    if (currentPage > 3) {
      pageButtons.push(
        <span
          className="page-btn grid h-[40px] w-[50px] cursor-text place-items-center rounded-[--border-radius] text-xl font-bold"
          key="dots-1"
        >
          ...
        </span>,
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        }),
      );
    }

    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        }),
      );
    }

    if (currentPage < numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        }),
      );
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span
          className="page-btn grid h-[40px] w-[50px] cursor-text place-items-center rounded-[--border-radius] text-xl font-bold"
          key="dots+1"
        >
          ...
        </span>,
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      }),
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
    <footer className="mt-8 flex h-24 flex-wrap items-center justify-end gap-4">
      <button
        onClick={toPrevPage}
        disabled={currentPage <= 1}
        className="btn text=[--primary-500] flex h-[40px] w-[100px] items-center justify-center gap-2 rounded-[--border-radius] bg-[--background-secondary-color] capitalize tracking-[--letter-spacing] disabled:pointer-events-none"
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="flex items-center rounded-[--border-radius] bg-[--background-secondary-color]">
        {renderButtons()}
      </div>
      <button
        onClick={toNextPage}
        className="btn text=[--primary-500] flex h-[40px] w-[100px] items-center justify-center gap-2 rounded-[--border-radius] bg-[--background-secondary-color] capitalize tracking-[--letter-spacing] disabled:pointer-events-none"
        disabled={currentPage >= numOfPages}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </footer>
  );
};

export default PageBtnContainer;
