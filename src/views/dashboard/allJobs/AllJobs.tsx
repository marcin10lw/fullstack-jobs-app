import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import JobsContainer from 'src/views/dashboard/allJobs/JobsContainer';
import SearchContainer from 'src/views/dashboard/allJobs/SearchContainer';
import { searchParamsDefaultValues } from './constants';
import AllJobsSkeleton from './AllJobsSkeleton';

const AllJobs = () => {
  const jobsContainerRef = useRef<HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams(
    searchParamsDefaultValues,
  );

  const {
    data: jobsData,
    isLoading,
    isSuccess,
    refetch,
  } = jobRepository.useGetAllJobs();

  const setPage = (pageNumber: number) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  const scrollToJobs = () => {
    const top = jobsContainerRef.current?.getBoundingClientRect().top;

    if (top) {
      window.scrollTo({
        top: top - document.body.getBoundingClientRect().top - 136,
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchParams]);

  if (isLoading) return <AllJobsSkeleton />;
  if (isSuccess) {
    return (
      <>
        <SearchContainer />

        <JobsContainer
          jobsData={jobsData}
          setPage={setPage}
          jobsContainerRef={jobsContainerRef}
          scrollToJobs={scrollToJobs}
        />
      </>
    );
  }
  return <></>;
};

export default AllJobs;
