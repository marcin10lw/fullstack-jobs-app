import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Wrapper } from "src/assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitButton } from "src/components";
import {
  InferJob,
  Job as JobType,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from "src/models/Job";
import customFetch from "src/utils/customFetch";
import { CustomAxiosError } from "src/types";
import errorMessage from "src/utils/errorMessage";

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
      await qc.invalidateQueries(["jobs, job"]);
      navigate("../all-jobs");
      toast.success("Task updated");
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, "Could not update job");
    },
  });

  const onFormSubmit = (job: InferJob) => {
    mutate(job);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="position"
            register={register("position")}
            error={errors.position}
          />
          <FormRow
            type="text"
            name="company"
            labelText="company"
            register={register("company")}
            error={errors.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            register={register("jobLocation")}
            error={errors.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            register={register("jobStatus")}
            error={errors.jobStatus}
            options={jobStatusItems}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            register={register("jobType")}
            error={errors.jobType}
            options={jobTypeItems}
          />

          <SubmitButton isLoading={isLoading} isFormBtn />
        </div>
      </form>
    </Wrapper>
  );
};

export default EditJobForm;
