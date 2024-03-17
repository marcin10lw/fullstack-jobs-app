import { AxiosError } from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ContentWrapper from 'src/components/ContentWrapper';
import NotFound from 'src/components/NotFound';
import { Button, buttonVariants } from 'src/components/ui/button';
import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import { ROUTES } from 'src/routes';
import EditJobDrawer from '../EditJobDrawer';
import JobDetail from './JobDetail';
import DatePicker from './DatePicker';
import JobDescription from './JobDescription';

const Job = () => {
  const { jobId } = useParams<{ jobId: string }>();

  if (!jobId) return null;

  const {
    data: job,
    isLoading: isJobLoading,
    error,
  } = jobRepository.useGetJobById(jobId);

  if (isJobLoading) return <Loader2 className="mx-auto size-10 animate-spin" />;

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
      <ContentWrapper className="relative">
        <Link
          to={ROUTES.allJobs}
          className="absolute left-7 top-4 flex items-center gap-2 text-primary"
        >
          <ArrowLeft className="size-5" />
          Back to jobs
        </Link>
        <section className="mt-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">Jobs details</h1>
            <EditJobDrawer jobId={job.id} />
          </div>

          <dl className="mt-4 grid max-w-[80%] md:grid-cols-2">
            <div>
              <JobDetail
                descriptionTerm="Company:"
                descriptionDetail={job.company}
              />
              <JobDetail
                descriptionTerm="Position:"
                descriptionDetail={job.position}
              />
              <JobDetail
                descriptionTerm="Location:"
                descriptionDetail={job.jobLocation}
              />
            </div>

            <div>
              <JobDetail
                descriptionTerm="Job Status:"
                descriptionDetail={job.jobStatus}
              />
              <JobDetail
                descriptionTerm="Job Type:"
                descriptionDetail={job.jobType}
              />
            </div>
          </dl>

          {/* <DatePicker /> */}

          <div className="mt-8 md:mt-12">
            <JobDescription
              jobDescription={job.jobDescription}
              jobId={job.id}
            />
          </div>
        </section>
      </ContentWrapper>
    );

  return <div>Job</div>;
};

export default Job;
