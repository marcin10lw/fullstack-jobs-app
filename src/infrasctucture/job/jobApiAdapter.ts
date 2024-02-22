import customFetch from 'src/helpers/customFetch';
import { InferJob } from 'src/models/Job';
import { JOB_API_URLS } from './jobApiUrls';

export const jobAPI = {
  addNewJob: (job: InferJob) => customFetch.post(JOB_API_URLS.addNewJob, job),
};
