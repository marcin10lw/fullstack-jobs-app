import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import customFetch from "src/utils/customFetch";
import SearchContainer from "src/components/SearchContainer";
import JobsContainer from "src/components/JobsContainer";
import { ApiJobsResponse, SearchParamsObject } from "src/types";

const searchParamsDefaultValues: SearchParamsObject = {
  jobStatus: "all",
  jobType: "all",
  search: "",
  sort: "newest",
  page: "1",
};

const AllJobs = () => {
  const jobsContainerRef = useRef<HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams(
    searchParamsDefaultValues
  );

  const {
    data: jobsData,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<ApiJobsResponse> => {
      const { data } = await customFetch.get("/jobs", {
        params: searchParams,
      });

      return data;
    },
    keepPreviousData: true,
    cacheTime: 0,
  });

  const setPage = (pageNumber: number) => {
    searchParams.set("page", String(pageNumber));
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

  if (isLoading) return <h4>Loading...</h4>;
  if (isSuccess) {
    return (
      <>
        <SearchContainer
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          searchParamsDefaultValues={searchParamsDefaultValues}
        />

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
