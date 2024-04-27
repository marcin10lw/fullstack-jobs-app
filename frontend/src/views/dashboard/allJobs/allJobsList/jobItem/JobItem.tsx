import { ChevronRight, Briefcase, Calendar, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import { cn } from 'src/lib/utils';
import { Job as JobType } from 'src/schema/Job';
import JobItemFooter from './JobItemFooter';
import { ROUTES } from 'src/routes';

dayjs.extend(advancedFormat);

type JobInfoProps = {
  icon: JSX.Element;
  text: string;
};

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <div className="flex items-center">
      <span className="mr-4 flex items-center text-base text-[--text-secondary-color]">{icon}</span>
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
      <Link to={ROUTES.job.replace(':jobId', job.id)}>
        <header className="group grid grid-cols-[auto_1fr_auto] items-center border-b border-slate-400 p-[1rem_1.5rem]">
          <div className="mr-8 grid h-[60px] w-[60px] place-items-center rounded-[--border-radius] bg-primary text-2xl font-bold uppercase text-primary-foreground">
            {job.company.charAt(0)}
          </div>
          <div>
            <h5 className="mb-2">{job.position}</h5>
            <p className="capitalize tracking-widest text-muted-foreground">{job.company}</p>
          </div>
          <ChevronRight className="size-8 text-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
        </header>
      </Link>
      <div className="p-[1rem_1.5rem]">
        <div className="m-[1rem_0_1.5rem] grid items-center gap-6 sm:grid-cols-2">
          <JobInfo icon={<Navigation />} text={job.jobLocation} />
          <JobInfo icon={<Calendar />} text={date} />
          <JobInfo icon={<Briefcase />} text={job.jobType.replace('_', '-')} />
          <div className={cn('flex h-[30px] items-center justify-start gap-2 rounded-sm text-sm text-white')}>
            <span>Status:</span>
            <span className="uppercase">{job.jobStatus}</span>
          </div>
        </div>
        <JobItemFooter jobId={job.id} />
      </div>
    </article>
  );
};

export default JobItem;
