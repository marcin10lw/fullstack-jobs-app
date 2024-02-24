import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LabeledFormSelect from 'src/components/LabeledFormSelect';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
import customFetch from 'src/helpers/customFetch';
import errorMessage from 'src/helpers/errorMessage';
import {
  InferJob,
  Job as JobType,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from 'src/models/Job';
import { CustomAxiosError } from 'src/types';

type EditJobFormProps = {
  job: JobType;
  id?: string;
};

const EditJobForm = ({ job, id }: EditJobFormProps) => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<InferJob>({
    defaultValues: {
      position: job.position,
      company: job.company,
      jobLocation: job.jobLocation,
      jobStatus: job.jobStatus,
      jobType: job.jobType,
    },
    resolver: zodResolver(jobSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = form;

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
    <MaxWidthWrapper>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <h4 className="text-xl">edit job</h4>
        <div className="mt-12 grid gap-y-4 lg:grid-cols-2 lg:items-center lg:gap-[2rem_1rem] xl:grid-cols-3">
          <LabeledRegisterInput
            label="position"
            name="position"
            register={register('position')}
            error={errors.position}
            positionErrorAbsolute
          />
          <LabeledRegisterInput
            label="company"
            name="company"
            register={register('company')}
            error={errors.company}
            positionErrorAbsolute
          />
          <LabeledRegisterInput
            label="job location"
            name="jobLocation"
            register={register('jobLocation')}
            error={errors.jobLocation}
            positionErrorAbsolute
          />

          <Form {...form}>
            <FormField
              control={control}
              name="jobStatus"
              render={({ field: { value, onChange } }) => (
                <LabeledFormSelect
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
                <LabeledFormSelect
                  value={value}
                  onOptionChange={onChange}
                  label="job types"
                  options={jobTypeItems}
                />
              )}
            />
          </Form>

          <div className="mt-6">
            <Button disabled={isLoading} className="w-full">
              Update
            </Button>
          </div>
        </div>
      </form>
    </MaxWidthWrapper>
  );
};

export default EditJobForm;
