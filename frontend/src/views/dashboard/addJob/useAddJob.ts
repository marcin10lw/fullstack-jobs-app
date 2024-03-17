import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToast } from 'src/components/ui/use-toast';
import errorMessage from 'src/lib/helpers/errorMessage';
import { jobAPI } from 'src/infrasctucture/job/jobApiAdapter';
import { InferJob, jobSchema } from 'src/models/Job';
import { ROUTES } from 'src/routes';
import { CustomAxiosError } from 'src/types';
import { useUser } from '../DashboardLayout';

const useAddJob = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { toast } = useToast();

  const form = useForm<InferJob>({
    defaultValues: {
      company: '',
      position: '',
      jobLocation: user.location,
      jobStatus: 'pending',
      jobType: 'full_time',
    },
    resolver: zodResolver(jobSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = form;

  const qc = useQueryClient();

  const { mutate: addJob, isLoading: isAddingJob } = useMutation({
    mutationFn: jobAPI.addNewJob,
    onSuccess: async () => {
      await qc.invalidateQueries(['jobs']); // TO REPLACE WITH CONSTANT
      reset();
      toast({
        title: 'Job added',
        variant: 'success',
      });
      navigate(ROUTES.allJobs);
    },
    onError: (error: CustomAxiosError) => {
      toast({
        title: errorMessage(error, 'Could not find this job'),
        variant: 'destructive',
      });
    },
  });

  const onFormSubmit = (job: InferJob) => {
    addJob(job);
  };

  return {
    errors,
    control,
    form,
    isAddingJob,
    register,
    handleSubmit,
    onFormSubmit,
  };
};

export default useAddJob;
