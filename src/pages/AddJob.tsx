import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ContentWrapper from 'src/components/ContentWrapper';
import ErrorMessage from 'src/components/ErrorMessage';
import LabeledInput from 'src/components/LabeledInput';
import LabeledSelect from 'src/components/LabeledSelect';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
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
    watch,
  } = form;
  console.log(watch());

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

          <Form {...form}>
            <FormField
              control={control}
              name="jobStatus"
              render={({ field: { value, onChange } }) => (
                <LabeledSelect
                  value={value}
                  onOptionChange={onChange}
                  label="job status"
                  options={jobStatusItems}
                />
              )}
            />
            <FormField
              control={control}
              name="jobType"
              render={({ field: { value, onChange } }) => (
                <LabeledSelect
                  value={value}
                  onOptionChange={onChange}
                  label="job types"
                  options={jobTypeItems}
                />
              )}
            />
          </Form>

          <Button className="mt-6">Add Job</Button>
        </div>
      </form>
    </ContentWrapper>
  );
};

export default AddJob;
