import ErrorMessage from 'src/components/ErrorMessage';
import LabeledInput from 'src/components/LabeledInput';
import LabeledSelect from 'src/components/LabeledSelect';
import { Button } from 'src/components/ui/button';
import { Form, FormField } from 'src/components/ui/form';
import { jobStatusItems, jobTypeItems } from 'src/models/Job';
import useAddJob from './useAddJob';

const AddJobForm = () => {
  const { form, control, errors, handleSubmit, onFormSubmit, register } =
    useAddJob();

  return (
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
  );
};

export default AddJobForm;
