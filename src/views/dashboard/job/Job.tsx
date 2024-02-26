import { AxiosError } from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ContentWrapper from 'src/components/ContentWrapper';
import NotFound from 'src/components/NotFound';
import { buttonVariants } from 'src/components/ui/button';
import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import { ROUTES } from 'src/routes';

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
      <ContentWrapper>
        <h1 className="text-xl">Jobs details</h1>

        <dl className="mt-4">
          <div className="flex items-center gap-2">
            <dt className="font-semibold">Company:</dt>
            <dd>{job.company}</dd>
          </div>

          <div className="flex items-center gap-2">
            <dt className="font-semibold">Position:</dt>
            <dd>{job.position}</dd>
          </div>
        </dl>
      </ContentWrapper>
    );

  return <div>Job</div>;
};

export default Job;
