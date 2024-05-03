import { AxiosError } from 'axios';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import ContentWrapper from 'src/components/ContentWrapper';
import NotFound from 'src/components/NotFound';
import { buttonVariants } from 'src/components/ui/button';
import { jobRepository } from 'src/api/job/jobRepository';
import { ROUTES } from 'src/routes';
import EditJobDrawer from '../EditJobDrawer';
import ScreenSkeleton from '../ScreenSkeleton';
import JobDescription from './JobDescription';
import JobDetail from './JobDetail';
import JobMap from './JobMap';
import { convertApiOption } from 'src/lib/helpers/convertApiOption';
import DatePicker from './DatePicker';

const Job = () => {
  const { jobId } = useParams<{ jobId: string }>();

  if (!jobId) return null;

  const { data: job, isLoading: isJobLoading, error } = jobRepository.useGetJobById(jobId);

  if (isJobLoading) return <ScreenSkeleton />;

  if (error && error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return (
        <NotFound text="Job doesn't exist">
          <Link
            to={ROUTES.allJobs}
            className={buttonVariants({
              variant: 'link',
              className: 'mt-2 flex items-center text-center',
            })}
          >
            <ArrowLeft className="size-4 text-primary" />
            Go back to jobs page
          </Link>
        </NotFound>
      );
    }
  }

  if (job)
    return (
      <div className="flex flex-col gap-8">
        <ContentWrapper className="relative pb-10 md:pb-10">
          <Link to={ROUTES.allJobs} className="absolute left-4 top-4 flex items-center gap-2 text-primary md:left-7">
            <ArrowLeft className="size-5" />
            Back to jobs
          </Link>
          <section className=" mt-8 md:mt-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">Jobs details</h1>
              <EditJobDrawer jobId={job.id} />
            </div>

            <dl className="mt-4 grid max-w-[80%] gap-1.5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <JobDetail descriptionTerm="Company:" descriptionDetail={job.company} />
                <JobDetail descriptionTerm="Position:" descriptionDetail={job.position} />
                <JobDetail descriptionTerm="Location:" descriptionDetail={job.jobLocation} />
              </div>

              <div className="flex flex-col gap-1.5">
                <JobDetail descriptionTerm="Job Status:" descriptionDetail={job.jobStatus} />
                <JobDetail descriptionTerm="Job Type:" descriptionDetail={convertApiOption(job.jobType, '_', '-')} />
              </div>
            </dl>

            <div className="mt-8 md:mt-12">
              <JobDescription jobDescription={job.jobDescription} jobId={job.id} />
            </div>
          </section>
        </ContentWrapper>
        <ContentWrapper title="Interview Date" className="pb-10 pt-6 md:pb-10 md:pt-6">
          <div className="md:max-w-[260px]">
            <DatePicker />
          </div>
        </ContentWrapper>
        <ContentWrapper title="Location" className="pb-10 pt-6 md:pb-10 md:pt-6">
          <JobMap />
        </ContentWrapper>
      </div>
    );

  return <div>Job</div>;
};

export default Job;
