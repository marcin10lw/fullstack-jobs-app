import { AllJobsSearchParams } from '../types';

export const searchParamsDefaultValues: AllJobsSearchParams = {
  jobStatus: 'all',
  jobType: 'all',
  search: '',
  sort: 'newest',
  page: '1',
};
