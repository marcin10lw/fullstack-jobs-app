import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import customFetch from "src/utils/customFetch";
import { Job } from "src/models/Job";
import SearchContainer from "src/components/SearchContainer";
import JobsContainer from "src/components/JobsContainer";
import { useEffect } from "react";
import { SearchParamsObject } from "src/types";

const searchParamsDefaultValues: SearchParamsObject = {
  jobStatus: "all",
  jobType: "all",
  search: "",
  sort: "newest",
};

const AllJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    searchParamsDefaultValues
  );

  const {
    data: jobs,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      const { data } = await customFetch.get("/jobs", {
        params: searchParams,
      });
      return data.jobs;
    },
    keepPreviousData: true,
    cacheTime: 0,
  });

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
        <JobsContainer jobs={jobs} />
      </>
    );
  }
};
export default AllJobs;
