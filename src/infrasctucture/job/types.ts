import { Job } from 'src/models/Job';

export type ApiJobsResponse = {
  jobs: Job[];
  currentPage: number;
  totalJobs: number;
  numOfPages: number;
};
