import { AxiosError } from 'axios';
import { Job } from './models/Job';

export type SearchOnChange = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type Theme = 'light' | 'dark';

export type CustomAxiosError = AxiosError<{ msg?: string }>;

export type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
};

export type ApiJobsResponse = {
  jobs: Job[];
  currentPage: number;
  totalJobs: number;
  numOfPages: number;
};

export type MonthlyApplications = {
  count: number;
  date: string;
}[];

export type ApiStatsResponse = {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplications;
};

export type SearchParamsObject = {
  search?: string;
  jobStatus?: 'all' | 'pending' | 'interview' | 'declined';
  jobType?: 'all' | 'full-time' | 'part-time' | 'internship';
  sort?: 'newest' | 'oldest' | 'a-z' | 'z-a';
  page?: string;
};
