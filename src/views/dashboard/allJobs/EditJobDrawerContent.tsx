import { Loader2 } from 'lucide-react';
import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import EditJobForm from 'src/views/dashboard/allJobs/EditJobForm';

interface EditJobDrawerContentProps {
  jobId: string;
}

const EditJobDrawerContent = ({ jobId }: EditJobDrawerContentProps) => {
  const { data: job, isLoading } = jobRepository.useGetJobById(jobId);
  console.log(job);

  if (isLoading) return <Loader2 className="animate-spin" />;

  if (!job) return null;

  return <EditJobForm job={job} id={jobId} />;
};

export default EditJobDrawerContent;
