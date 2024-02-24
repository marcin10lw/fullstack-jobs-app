import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaLocationArrow, FaBriefcase, FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

import { Job as JobType } from 'src/models/Job';
import customFetch from 'src/helpers/customFetch';
import { CustomAxiosError } from 'src/types';
import errorMessage from 'src/helpers/errorMessage';
import { buttonVariants } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

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
  const qc = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => customFetch.delete(`/jobs/${job._id}`),
    onSuccess: async () => {
      await qc.invalidateQueries(['jobs']);
      toast.success('Job deleted');
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, 'Could not update user');
    },
  });

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
        <footer className="mt-4 flex items-center">
          <Link
            to={`../edit-job/${job._id}`}
            className={buttonVariants({
              className: 'mr-2 flex h-[30px] items-center text-sm',
            })}
          >
            Edit
          </Link>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              mutate();
            }}
          >
            <button
              disabled={isLoading}
              className={buttonVariants({
                className: 'mr-2 flex h-[30px] items-center text-sm',
                variant: 'destructive',
              })}
            >
              Delete
            </button>
          </form>
        </footer>
      </div>
    </article>
  );
};

export default JobItem;
