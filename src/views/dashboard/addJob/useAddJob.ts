import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import customFetch from 'src/helpers/customFetch';
import errorMessage from 'src/helpers/errorMessage';
import { InferJob, jobSchema } from 'src/models/Job';
import { CustomAxiosError } from 'src/types';
import { useUser } from '../DashboardLayout';

const useAddJob = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const form = useForm<InferJob>({
    defaultValues: {
      company: '',
      position: '',
      jobLocation: user.location,
      jobStatus: 'pending',
      jobType: 'full-time',
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

  const { mutate } = useMutation({
    mutationFn: (job: InferJob) => customFetch.post('/jobs', job),
    onSuccess: async () => {
      await qc.invalidateQueries(['jobs']);
      reset();
      toast.success('Job added');
      navigate('./all-jobs');
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, 'Could not find this job');
    },
  });

  const onFormSubmit = (job: InferJob) => {
    mutate(job);
  };

  return {
    errors,
    control,
    form,
    register,
    handleSubmit,
    onFormSubmit,
  };
};

export default useAddJob;
