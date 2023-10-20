import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import customFetch from 'src/utils/customFetch';
import { useUser } from './DashboardLayout';
import { FormRow, FormRowSelect, SubmitButton } from 'src/components';
import {
  InferJob,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from 'src/models/Job';
import { CustomAxiosError } from 'src/types';
import errorMessage from 'src/utils/errorMessage';

const AddJob = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InferJob>({
    defaultValues: {
      company: '',
      position: '',
      jobLocation: user.location,
      jobStatus: 'pending',
      jobType: 'full-time',
    },
    resolver: zodResolver(jobSchema),
  });

  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
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

  return (
    <div className="w-full rounded-[--border-radius] bg-[--background-secondary-color] p-[3rem_2rem_4rem]">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="form rounded-0 m-0 w-full max-w-full p-0 shadow-none"
        noValidate
      >
        <h4 className="mb-8">add job</h4>
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:items-center md:gap-[2rem_1rem] lg:grid-cols-3">
          <FormRow
            type="text"
            name="position"
            labelText="position"
            register={register('position')}
            error={errors.position}
            isDashboardRow
          />
          <FormRow
            type="text"
            name="company"
            labelText="company"
            register={register('company')}
            error={errors.company}
            isDashboardRow
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            register={register('jobLocation')}
            error={errors.jobLocation}
            isDashboardRow
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            register={register('jobStatus')}
            error={errors.jobStatus}
            options={jobStatusItems}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            register={register('jobType')}
            error={errors.jobType}
            options={jobTypeItems}
          />

          <div className="mt-4 md:mt-8">
            <SubmitButton isLoading={isLoading} isFormBtn />
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddJob;
