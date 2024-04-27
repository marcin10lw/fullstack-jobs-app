import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useToast } from 'src/components/ui/use-toast';
import { ALL_JOBS_QUERY_KEY, JOB_BY_ID_QUERY_KEY } from 'src/api/job/constants';
import { jobAPI } from 'src/api/job/jobApiAdapter';
import { checkHasAnyFieldChanged } from 'src/lib/helpers/checkHasAnyFieldChanged';
import errorMessage from 'src/lib/helpers/errorMessage';
import { InferJob, Job, jobSchema } from 'src/schema/Job';
import { CustomAxiosError } from 'src/types';

interface Props {
  job: Job;
  jobId: string;
  closeDrawer: () => void;
}

export const useUpdateJob = ({ job, jobId, closeDrawer }: Props) => {
  const qc = useQueryClient();

  const { toast } = useToast();

  const initialJob = {
    position: job.position,
    company: job.company,
    jobLocation: job.jobLocation,
    jobStatus: job.jobStatus,
    jobType: job.jobType,
  };

  const form = useForm<InferJob>({
    defaultValues: initialJob,
    resolver: zodResolver(jobSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = form;

  const currentFormValues = watch();
  const hasAnyFieldChanged = checkHasAnyFieldChanged(currentFormValues, initialJob);

  const { mutate: updateJob, isLoading: isJobUpdating } = useMutation({
    mutationFn: (job: InferJob) => jobAPI.updateJobById(job, jobId),
    onSuccess: () => {
      qc.invalidateQueries([ALL_JOBS_QUERY_KEY]);
      qc.invalidateQueries([JOB_BY_ID_QUERY_KEY]);
      closeDrawer();
      setTimeout(() => {
        toast({
          title: 'Job updated successfully',
          variant: 'success',
        });
      }, 300);
    },
    onError: (error: CustomAxiosError) => {
      toast({
        title: 'An error occurred',
        description: errorMessage(error, 'Failed to update job'),
        variant: 'destructive',
      });
    },
  });

  const onFormSubmit = (job: InferJob) => {
    if (!hasAnyFieldChanged) return;
    updateJob(job);
  };

  return {
    register,
    errors,
    handleSubmit,
    control,
    isJobUpdating,
    hasAnyFieldChanged,
    onFormSubmit,
    form,
  };
};
