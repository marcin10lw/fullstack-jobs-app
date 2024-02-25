import customFetch from 'src/lib/helpers/customFetch';
import { InferJob, Job } from 'src/models/Job';
import { JOB_API_URLS } from './jobApiUrls';
import { ApiJobsResponse, ApiStatsResponse } from './types';

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

  deleteJob: (jobId: string) =>
    customFetch.delete(JOB_API_URLS.deleteJob.replace(':jobId', jobId)),

  getJobById: async (jobId: string): Promise<Job> => {
    const { data } = await customFetch.get(
      JOB_API_URLS.getJobById.replace(':jobId', jobId),
    );

    return data.job;
  },

  updateJobById: (job: InferJob, jobId: string) =>
    customFetch.patch(JOB_API_URLS.updateJobById.replace(':jobId', jobId), job),

  getJobStats: async (): Promise<ApiStatsResponse> => {
    const { data } = await customFetch.get(JOB_API_URLS.getJobStats);
    return data;
  },
};
