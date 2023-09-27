import { useQuery } from "@tanstack/react-query";

import customFetch from "src/utils/customFetch";
import { Job } from "src/models/Job";
import SearchContainer from "src/components/SearchContainer";
import JobsContainer from "src/components/JobsContainer";

const AllJobs = () => {
  const {
    data: jobs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      const { data } = await customFetch.get("/jobs");
      return data.jobs;
    },
  });

  if (isLoading) return <h4>Loading...</h4>;

  if (isSuccess) {
    console.log(jobs);

    return (
      <>
        <SearchContainer />
        <JobsContainer jobs={jobs} />
      </>
    );
  }
};
export default AllJobs;
