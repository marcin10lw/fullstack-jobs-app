import { Loader2 } from 'lucide-react';
import { jobRepository } from 'src/api/job/jobRepository';
import EditJobForm from 'src/views/dashboard/allJobs/allJobsList/jobItem/EditJobForm';

interface EditJobDrawerContentProps {
  jobId: string;
  closeDrawer: () => void;
}

const EditJobDrawerContent = ({ jobId, closeDrawer }: EditJobDrawerContentProps) => {
  const { data: job, isLoading: isJobLoading } = jobRepository.useGetJobById(jobId);

  if (isJobLoading) return <Loader2 className="mx-auto mt-3 size-8 animate-spin" />;

  if (!job) return null;

  return <EditJobForm job={job} jobId={jobId} closeDrawer={closeDrawer} />;
};

export default EditJobDrawerContent;
