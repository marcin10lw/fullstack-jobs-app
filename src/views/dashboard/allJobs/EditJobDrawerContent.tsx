import { Loader2 } from 'lucide-react';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
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

  return (
    <MaxWidthWrapper>
      <EditJobForm job={job} id={jobId} />
    </MaxWidthWrapper>
  );
};

export default EditJobDrawerContent;
