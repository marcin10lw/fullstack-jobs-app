import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendar } from "react-icons/fa";
import { IconType } from "react-icons";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import { Job as JobType } from "src/models/Job";
import { Wrapper, JobInfoWrapper } from "src/assets/wrappers/Job";

type JobInfoProps = {
  icon: JSX.Element;
  text: string;
};

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <JobInfoWrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </JobInfoWrapper>
  );
};

type JobProps = {
  job: JobType;
};

const Job = ({ job }: JobProps) => {
  const date = dayjs(job.createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{job.company.charAt(0)}</div>
        <div className="info">
          <h5>{job.position}</h5>
          <p>{job.company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={job.jobLocation} />
          <JobInfo icon={<FaCalendar />} text={job.jobType} />
          <JobInfo icon={<FaBriefcase />} text={job.jobStatus} />

          <div className={`status ${job.jobStatus}`}>{job.jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to="" className="btn edit-btn">
            Edit
          </Link>
          <form>
            <button className="btn delete-btn">Delete</button>
          </form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
