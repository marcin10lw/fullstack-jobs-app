import { ApiJobsResponse } from "src/types";
import PageBtnContainer from "./PageBtnContainer";
import { Wrapper } from "src/assets/wrappers/JobsContainer";
import { Job } from "src/components";

type JobsContainerProps = {
  jobsData: ApiJobsResponse;
  jobsContainerRef: React.RefObject<HTMLElement>;
  setPage: (pageNumber: number) => void;
  scrollToJobs: () => void;
};

const JobsContainer = ({
  jobsData,
  jobsContainerRef,
  setPage,
  scrollToJobs,
}: JobsContainerProps) => {
  const { jobs, currentPage, numOfPages, totalJobs } = jobsData;

  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );

  return (
    <Wrapper ref={jobsContainerRef}>
      <h5>
        {totalJobs} {totalJobs > 1 ? "jobs" : "job"}
      </h5>

      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>

      {numOfPages > 1 && (
        <PageBtnContainer
          currentPage={currentPage}
          numOfPages={numOfPages}
          setPage={setPage}
          scrollToJobs={scrollToJobs}
        />
      )}
    </Wrapper>
  );
};

export default JobsContainer;
