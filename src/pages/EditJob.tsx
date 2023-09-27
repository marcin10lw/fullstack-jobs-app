import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import customFetch from "src/utils/customFetch";
import { Job as JobType } from "src/models/Job";
import EditJobForm from "./EditJobForm";

const EditJob = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { data: job, status } = useQuery({
    queryKey: ["job", pathname],
    queryFn: async (): Promise<JobType> => {
      const { data } = await customFetch.get(`jobs/${id}`);
      return data.job;
    },
  });

  if (status === "loading") return <h2>Loading...</h2>;

  if (status === "error") return <h2>No job with id: {id}</h2>;

  if (status === "success") return <EditJobForm job={job} id={id} />;
};
export default EditJob;
