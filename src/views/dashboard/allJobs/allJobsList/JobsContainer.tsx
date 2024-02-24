import { ApiJobsResponse } from 'src/infrasctucture/job/types';
import AllJobsList from './AllJobsList';
import PageBtnContainer from '../PageBtnContainer';

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
      <section className="mt-16">
        <h2 className="normal-case">No jobs to display...</h2>
      </section>
    );

  return (
    <section ref={jobsContainerRef} className="mt-16">
      <h5 className="mb-6 font-bold">
        {totalJobs} {totalJobs > 1 ? 'jobs' : 'job'}
      </h5>
      <AllJobsList jobs={jobs} />
      {numOfPages > 1 && (
        <PageBtnContainer
          currentPage={currentPage}
          numOfPages={numOfPages}
          setPage={setPage}
          scrollToJobs={scrollToJobs}
        />
      )}
    </section>
  );
};

export default JobsContainer;
