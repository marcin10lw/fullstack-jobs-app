import { useSearchParams } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { buttonVariants } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';
import { searchParamsDefaultValues } from './search/constants';

type PageBtnContainerProps = {
  numOfPages: number;
  currentPage: number;
  scrollToJobs: () => void;
};

const PageBtnContainer = ({ currentPage, numOfPages, scrollToJobs }: PageBtnContainerProps) => {
  const [searchParams, setSearchParams] = useSearchParams(searchParamsDefaultValues);

  const setPage = (pageNumber: number) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  const addPageButton = ({ pageNumber, activeClass }: { pageNumber: number; activeClass: boolean }) => {
    return (
      <button
        className={cn(
          'h-[40px] w-[50px] shrink-0 cursor-pointer text-xl font-bold transition-colors duration-300 ease-in-out first:rounded-l-sm last:rounded-r-sm hover:bg-primary/50',
          {
            'bg-primary text-primary-foreground': activeClass,
            'bg-transparent': !activeClass,
          },
        )}
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
          className="grid h-[40px] w-[50px] cursor-text place-items-center rounded-sm text-xl font-bold text-primary"
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
          className="grid h-[40px] w-[50px] cursor-text place-items-center rounded-sm text-xl font-bold text-primary"
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
    <footer className="mt-8 flex h-24 flex-wrap items-center justify-around gap-4 md:justify-end">
      <button
        onClick={toPrevPage}
        disabled={currentPage <= 1}
        className={buttonVariants({
          className:
            'flex h-[40px] w-[40px] items-center justify-center gap-2 rounded-sm capitalize tracking-wider disabled:pointer-events-none md:w-[100px]',
        })}
      >
        <ChevronsLeft className="size-6 shrink-0" />
        <span className="hidden md:inline-block">prev</span>
      </button>
      <div className="flex max-w-[200px] items-center overflow-x-auto rounded-sm bg-muted min-[575px]:max-w-full">
        {renderButtons()}
      </div>
      <button
        onClick={toNextPage}
        className={buttonVariants({
          className:
            'flex h-[40px] w-[40px] items-center justify-center gap-2 rounded-sm capitalize tracking-wider disabled:pointer-events-none md:w-[100px]',
        })}
        disabled={currentPage >= numOfPages}
      >
        <span className="hidden md:inline-block">next</span>
        <ChevronsRight className="size-6 shrink-0" />
      </button>
    </footer>
  );
};

export default PageBtnContainer;
