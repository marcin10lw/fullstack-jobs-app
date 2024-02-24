import { Job } from 'src/models/Job';
import JobItem from './JobItem';

interface AllJobsListProps {
  jobs: Job[];
}

const AllJobsList = ({ jobs }: AllJobsListProps) => {
  return (
    <div className="grid gap-8 xl:grid-cols-2">
      {jobs.map((job) => (
        <JobItem key={job._id} job={job} />
      ))}
    </div>
  );
};

export default AllJobsList;
