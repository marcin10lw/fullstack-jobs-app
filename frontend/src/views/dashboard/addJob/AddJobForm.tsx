import { Loader2 } from 'lucide-react';
import LabeledFormSelect from 'src/components/LabeledFormSelect';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
import { jobStatusItems, jobTypeItems } from 'src/models/Job';
import useAddJob from './useAddJob';

const AddJobForm = () => {
  const {
    form,
    control,
    errors,
    isAddingJob,
    handleSubmit,
    onFormSubmit,
    register,
  } = useAddJob();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <div className="mt-12 grid gap-4 md:grid-cols-2 md:items-center md:gap-[2rem_1rem] lg:grid-cols-3">
        <LabeledRegisterInput
          type="text"
          name="position"
          label="position"
          register={register('position')}
          error={errors.position}
          positionErrorAbsolute
        />
        <LabeledRegisterInput
          type="text"
          name="company"
          label="company"
          register={register('company')}
          error={errors.company}
          positionErrorAbsolute
        />
        <LabeledRegisterInput
          type="text"
          name="jobLocation"
          label="job location"
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

        <Button disabled={isAddingJob} className="mt-6">
          {isAddingJob ? <Loader2 className="animate-spin" /> : 'Add Job'}
        </Button>
      </div>
    </form>
  );
};

export default AddJobForm;
