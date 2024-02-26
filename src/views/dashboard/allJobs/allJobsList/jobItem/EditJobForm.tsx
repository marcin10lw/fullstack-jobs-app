import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import LabeledFormSelect from 'src/components/LabeledFormSelect';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
import { useToast } from 'src/components/ui/use-toast';
import errorMessage from 'src/lib/helpers/errorMessage';
import { ALL_JOBS_QUERY_KEY } from 'src/infrasctucture/job/constants';
import { jobAPI } from 'src/infrasctucture/job/jobApiAdapter';
import {
  InferJob,
  Job as JobType,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from 'src/models/Job';
import { CustomAxiosError } from 'src/types';
import { checkHasAnyFieldChanged } from 'src/lib/helpers/checkHasAnyFieldChanged';

type EditJobFormProps = {
  job: JobType;
  jobId: string;
  closeDrawer: () => void;
};

const EditJobForm = ({ job, jobId, closeDrawer }: EditJobFormProps) => {
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
  const hasAnyFieldChanged = checkHasAnyFieldChanged(
    currentFormValues,
    initialJob,
  );

  const { mutate: updateJob, isLoading: isJobUpdating } = useMutation({
    mutationFn: (job: InferJob) => jobAPI.updateJobById(job, jobId),
    onSuccess: () => {
      qc.invalidateQueries([ALL_JOBS_QUERY_KEY]);
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

  return (
    <MaxWidthWrapper>
      <form className="mx-1" onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <h4 className="text-xl">edit job</h4>
        <div className="mt-8 grid gap-y-4 md:mt-12 lg:grid-cols-2 lg:items-center lg:gap-[2rem_1rem] xl:grid-cols-3">
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
            <Button
              disabled={isJobUpdating || !hasAnyFieldChanged}
              className="w-full"
            >
              {isJobUpdating ? <Loader2 className="animate-spin" /> : 'Update'}
            </Button>
          </div>
        </div>
      </form>
    </MaxWidthWrapper>
  );
};

export default EditJobForm;
