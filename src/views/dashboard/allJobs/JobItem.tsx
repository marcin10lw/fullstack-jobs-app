import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaBriefcase, FaCalendar, FaLocationArrow } from 'react-icons/fa';
dayjs.extend(advancedFormat);

import { cn } from 'src/lib/utils';
import { Job as JobType } from 'src/models/Job';
import JobItemFooter from './JobItemFooter';

type JobInfoProps = {
  icon: JSX.Element;
  text: string;
};

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <div className="flex items-center">
      <span className="mr-4 flex items-center text-base text-[--text-secondary-color]">
        {icon}
      </span>
      <span className="capitalize tracking-[--letter-spacing]">{text}</span>
    </div>
  );
};

type JobProps = {
  job: JobType;
};

const JobItem = ({ job }: JobProps) => {
  const date = dayjs(job.createdAt).format('MMM Do, YYYY');

  return (
    <article className="grid grid-rows-[1fr_auto] rounded-lg bg-secondary shadow-xl">
      <header className="grid grid-cols-[auto_1fr] items-center border-b border-slate-400 p-[1rem_1.5rem]">
        <div className="mr-8 grid h-[60px] w-[60px] place-items-center rounded-[--border-radius] bg-primary text-2xl font-bold uppercase text-white">
          {job.company.charAt(0)}
        </div>
        <div>
          <h5 className="mb-2">{job.position}</h5>
          <p className="capitalize tracking-widest text-muted-foreground">
            {job.company}
          </p>
        </div>
      </header>
      <div className="p-[1rem_1.5rem]">
        <div className="m-[1rem_0_1.5rem] grid items-center gap-6 sm:grid-cols-2">
          <JobInfo icon={<FaLocationArrow />} text={job.jobLocation} />
          <JobInfo icon={<FaCalendar />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={job.jobType} />
          <div
            className={cn(
              'flex h-[30px] w-[100px] items-center justify-center rounded-sm text-white',
              {
                'bg-slate-600': job.jobStatus === 'pending',
                'bg-purple-900': job.jobStatus === 'interview',
                'bg-red-950': job.jobStatus === 'declined',
              },
            )}
          >
            {job.jobStatus}
          </div>
        </div>
        <JobItemFooter jobId={job._id} />
      </div>
    </article>
  );
};

export default JobItem;
