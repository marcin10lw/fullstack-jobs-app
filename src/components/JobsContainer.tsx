import { Job } from "src/components";
import { Wrapper } from "src/assets/wrappers/JobsContainer";
import { Job as JobType } from "src/models/Job";

type JobsContainerProps = {
  jobs: JobType[];
};

const JobsContainer = ({ jobs }: JobsContainerProps) => {
  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
