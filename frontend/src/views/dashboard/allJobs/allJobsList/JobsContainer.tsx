import { ApiJobsResponse } from 'src/api/job/types';
import AllJobsList from './AllJobsList';
import PageBtnContainer from '../PageBtnContainer';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/routes';
import { buttonVariants } from 'src/components/ui/button';

type JobsContainerProps = {
  jobsData: ApiJobsResponse;
};

const JobsContainer = ({ jobsData }: JobsContainerProps) => {
  const jobsContainerRef = useRef<HTMLElement>(null);

  const scrollToJobs = () => {
    const containerRef = jobsContainerRef;

    if (containerRef.current) {
      containerRef.current.scrollIntoView();
    }
  };

  const { jobs, currentPage, numOfPages, totalJobs } = jobsData;

  if (jobs.length === 0)
    return (
      <section className="mt-16 flex flex-col items-center gap-2">
        <h2 className="text-lg normal-case">No jobs to display</h2>
        <Link
          to={ROUTES.addJob}
          className={buttonVariants({
            variant: 'link',
            className: 'text-xl',
          })}
        >
          Add new job
        </Link>
      </section>
    );

  return (
    <section ref={jobsContainerRef} className="pt-16">
      <h5 className="mb-6 font-bold">
        {totalJobs} {totalJobs > 1 ? 'jobs' : 'job'}
      </h5>
      <AllJobsList jobs={jobs} />
      {numOfPages > 1 && (
        <PageBtnContainer currentPage={currentPage} numOfPages={numOfPages} scrollToJobs={scrollToJobs} />
      )}
    </section>
  );
};

export default JobsContainer;
