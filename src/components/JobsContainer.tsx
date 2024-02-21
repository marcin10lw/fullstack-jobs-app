import { ApiJobsResponse } from 'src/types';
import PageBtnContainer from './PageBtnContainer';
import Job from './Job';

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

      <div className="grid gap-8 xl:grid-cols-2">
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
    </section>
  );
};

export default JobsContainer;
