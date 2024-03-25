import LabeledFormSelect from 'src/components/LabeledFormSelect';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
import { buildSelectOptions } from 'src/lib/helpers/buildSelectOptions';
import { jobStatusItems, jobTypeItems } from 'src/schema/Job';
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

        <Button disabled={isAddingJob} isLoading={isAddingJob} className="mt-6">
          Add Job
        </Button>
      </div>
    </form>
  );
};

export default AddJobForm;
