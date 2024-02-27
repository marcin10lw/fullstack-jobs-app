export type AllJobsSearchParams = {
  search?: string;
  jobStatus?: 'all' | 'pending' | 'interview' | 'declined';
  jobType?: 'all' | 'full-time' | 'part-time' | 'internship';
  sort?: 'newest' | 'oldest' | 'a-z' | 'z-a';
  page?: string;
};
