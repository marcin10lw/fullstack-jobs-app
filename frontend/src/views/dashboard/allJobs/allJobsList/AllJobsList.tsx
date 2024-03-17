import { Job } from 'src/models/Job';
import JobItem from './jobItem/JobItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface AllJobsListProps {
  jobs: Job[];
}

const AllJobsList = ({ jobs }: AllJobsListProps) => {
  const [listRef] = useAutoAnimate();

  return (
    <div ref={listRef} className="grid gap-8 xl:grid-cols-2">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default AllJobsList;
