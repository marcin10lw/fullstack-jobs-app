import { Loader2 } from 'lucide-react';
import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import EditJobForm from 'src/views/dashboard/allJobs/EditJobForm';

interface EditJobDrawerContentProps {
  jobId: string;
}

const EditJobDrawerContent = ({ jobId }: EditJobDrawerContentProps) => {
  const { data: job, isLoading: isJobLoading } =
    jobRepository.useGetJobById(jobId);

  if (isJobLoading)
    return <Loader2 className="mx-auto mt-3 size-8 w-full animate-spin" />;

  if (!job) return null;

  return <EditJobForm job={job} jobId={jobId} />;
};

export default EditJobDrawerContent;
