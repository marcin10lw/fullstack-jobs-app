import { Loader2 } from 'lucide-react';

import LabeledFormSelect from 'src/components/LabeledFormSelect';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
import { Job as JobType, jobStatusItems, jobTypeItems } from 'src/schema/Job';
import { useUpdateJob } from './useUpdateJob';
import { buildSelectOptions } from 'src/lib/helpers/buildSelectOptions';

interface EditJobFormProps {
  job: JobType;
  jobId: string;
  closeDrawer: () => void;
}

const EditJobForm = ({ job, jobId, closeDrawer }: EditJobFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    hasAnyFieldChanged,
    isJobUpdating,
    onFormSubmit,
    form,
  } = useUpdateJob({ job, jobId, closeDrawer });

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
                  options={buildSelectOptions(jobStatusItems)}
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
                  options={buildSelectOptions(jobTypeItems)}
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
