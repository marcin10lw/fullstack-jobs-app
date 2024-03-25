import { Job } from 'src/schema/Job';

export type ApiJobsResponse = {
  jobs: Job[];
  currentPage: number;
  totalJobs: number;
  numOfPages: number;
};

export type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
};

export type MonthlyApplications = {
  count: number;
  date: string;
}[];

export type ApiStatsResponse = {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplications;
};
