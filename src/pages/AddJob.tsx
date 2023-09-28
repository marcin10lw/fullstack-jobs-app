import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import customFetch from "src/utils/customFetch";
import { useUser } from "./DashboardLayout";
import { Wrapper } from "src/assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitButton } from "src/components";
import {
  InferJob,
  jobSchema,
  jobStatusItems,
  jobTypeItems,
} from "src/models/Job";

const AddJob = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InferJob>({
    defaultValues: {
      company: "",
      position: "",
      jobLocation: user.location,
      jobStatus: "pending",
      jobType: "full-time",
    },
    resolver: zodResolver(jobSchema),
  });

  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (job: InferJob) => customFetch.post("/jobs", job),
    onSuccess: async () => {
      await qc.invalidateQueries(["jobs"]);
      reset();
      toast.success("Job added");
      navigate("./all-jobs");
    },
    onError: () => {
      toast.error("Could not add a job");
    },
  });

  const onFormSubmit = (job: InferJob) => {
    mutate(job);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onFormSubmit)} className="form" noValidate>
        <h4 className="form-title">add job</h4>
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
            defaultValue="pending"
            register={register("jobStatus")}
            error={errors.jobStatus}
            options={jobStatusItems}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue="full-time"
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
export default AddJob;
