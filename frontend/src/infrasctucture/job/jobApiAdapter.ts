import { InferJob, Job } from 'src/models/Job';
import { JOB_API_URLS } from './jobApiUrls';
import { ApiJobsResponse, ApiStatsResponse } from './types';
import { restApi } from '../restApi';

export const jobAPI = {
  addNewJob: (job: InferJob) =>
    restApi.private.post(JOB_API_URLS.addNewJob, job),

  getAllJobs: async (
    searchParams: URLSearchParams,
  ): Promise<ApiJobsResponse> => {
    const params = Object.fromEntries(new URLSearchParams(searchParams));

    const { data } = await restApi.private.get(JOB_API_URLS.getAllJobs, {
      params,
    });

    return data;
  },

  deleteJob: (jobId: string) =>
    restApi.private.delete(JOB_API_URLS.deleteJob.replace(':jobId', jobId)),

  getJobById: async (jobId: string): Promise<Job> => {
    const { data } = await restApi.private.get(
      JOB_API_URLS.getJobById.replace(':jobId', jobId),
    );

    return data.job;
  },

  updateJobById: (job: InferJob, jobId: string) =>
    restApi.private.patch(
      JOB_API_URLS.updateJobById.replace(':jobId', jobId),
      job,
    ),

  getJobStats: async (): Promise<ApiStatsResponse> => {
    const { data } = await restApi.private.get(JOB_API_URLS.getJobStats);
    return data;
  },

  updateJobDescription: async ({
    jobId,
    jobDescription,
  }: {
    jobId: string;
    jobDescription: string;
  }) =>
    restApi.private.put(
      JOB_API_URLS.updateJobDescription.replace(':jobId', jobId),
      {
        jobDescription,
      },
    ),
};
