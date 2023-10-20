import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { FormRow, FormRowSelect, SubmitButton } from 'src/components';
import {
  InferJob,
  Job as JobType,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from 'src/models/Job';
import customFetch from 'src/utils/customFetch';
import { CustomAxiosError } from 'src/types';
import errorMessage from 'src/utils/errorMessage';

type EditJobFormProps = {
  job: JobType;
  id?: string;
};

const EditJobForm = ({ job, id }: EditJobFormProps) => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InferJob>({
    defaultValues: {
      position: job.position,
      company: job.company,
      jobLocation: job.jobLocation,
      jobStatus: job.jobStatus,
      jobType: job.jobType,
    },
    resolver: zodResolver(jobSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (job: InferJob) => customFetch.patch(`/jobs/${id}`, job),
    onSuccess: async () => {
      await qc.invalidateQueries(['jobs, job']);
      navigate('../all-jobs');
      toast.success('Task updated');
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, 'Could not update job');
    },
  });

  const onFormSubmit = (job: InferJob) => {
    mutate(job);
  };

  return (
    <div className="w-full rounded-[--border-radius] bg-[--background-secondary-color] p-[3rem_2rem_4rem]">
      <form
        className="form m-0 w-full max-w-full rounded-none p-0 shadow-none"
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
      >
        <h4 className="mb-8">edit job</h4>
        <div className="mt-12 grid gap-y-4 lg:grid-cols-2 lg:items-center lg:gap-[2rem_1rem] xl:grid-cols-3">
          <FormRow
            type="text"
            name="position"
            labelText="position"
            register={register('position')}
            error={errors.position}
          />
          <FormRow
            type="text"
            name="company"
            labelText="company"
            register={register('company')}
            error={errors.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            register={register('jobLocation')}
            error={errors.jobLocation}
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

          <div className="mt-4 lg:mt-8">
            <SubmitButton isLoading={isLoading} isFormBtn />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditJobForm;
