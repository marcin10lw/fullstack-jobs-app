import customFetch from 'src/helpers/customFetch';
import { InferJob } from 'src/models/Job';
import { JOB_API_URLS } from './jobApiUrls';
import { ApiJobsResponse } from './types';

export const jobAPI = {
  addNewJob: (job: InferJob) => customFetch.post(JOB_API_URLS.addNewJob, job),

  getAllJobs: async (
    searchParams: URLSearchParams,
  ): Promise<ApiJobsResponse> => {
    const { data } = await customFetch.get(JOB_API_URLS.getAllJobs, {
      params: searchParams,
    });

    return data;
  },
};
