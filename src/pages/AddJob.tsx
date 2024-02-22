import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ContentWrapper from 'src/components/ContentWrapper';
import ErrorMessage from 'src/components/ErrorMessage';
import LabeledInput from 'src/components/LabeledInput';
import Select from 'src/components/Select';
import { Button } from 'src/components/ui/button';
import customFetch from 'src/helpers/customFetch';
import errorMessage from 'src/helpers/errorMessage';
import {
  InferJob,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from 'src/models/Job';
import { CustomAxiosError } from 'src/types';
import { useUser } from '../views/dashboard/DashboardLayout';

const AddJob = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
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
  console.log(watch());
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
    <ContentWrapper title="add job">
      <form onSubmit={handleSubmit(onFormSubmit)} className="" noValidate>
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:items-center md:gap-[2rem_1rem] lg:grid-cols-3">
          <LabeledInput
            type="text"
            name="position"
            label="position"
            register={register('position')}
          >
            {errors.position?.message && (
              <ErrorMessage
                errorMessage={errors.position.message}
                className="absolute"
              />
            )}
          </LabeledInput>
          <LabeledInput
            type="text"
            name="company"
            label="company"
            register={register('company')}
          >
            {errors.company?.message && (
              <ErrorMessage
                errorMessage={errors.company.message}
                className="absolute"
              />
            )}
          </LabeledInput>
          <LabeledInput
            type="text"
            name="jobLocation"
            label="job location"
            register={register('jobLocation')}
          >
            {errors.jobLocation?.message && (
              <ErrorMessage
                errorMessage={errors.jobLocation.message}
                className="absolute"
              />
            )}
          </LabeledInput>

          <Controller
            name="jobStatus"
            control={control}
            render={({ field: { value, onChange } }) => {
              const onOptionChange = (value: string) => onChange(value);
              return (
                <Select
                  label="job status"
                  options={jobStatusItems}
                  value={value}
                  onOptionChange={onOptionChange}
                />
              );
            }}
          />

          <Controller
            name="jobType"
            control={control}
            render={({ field: { value, onChange } }) => {
              const onOptionChange = (value: string) => onChange(value);
              return (
                <Select
                  label="job type"
                  options={jobTypeItems}
                  value={value}
                  onOptionChange={onOptionChange}
                />
              );
            }}
          />

          <Button>Add Job</Button>
        </div>
      </form>
    </ContentWrapper>
  );
};

export default AddJob;
