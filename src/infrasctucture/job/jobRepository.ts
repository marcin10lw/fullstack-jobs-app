import { useQuery } from '@tanstack/react-query';
import { ALL_JOBS_QUERY_KEY, JOB_BY_ID_QUERY_KEY } from './constants';
import { jobAPI } from './jobApiAdapter';
import { useSearchParams } from 'react-router-dom';

export const jobRepository = {
  useGetAllJobs: () => {
    const [searchParams] = useSearchParams();

    return useQuery({
      queryKey: [ALL_JOBS_QUERY_KEY],
      queryFn: () => jobAPI.getAllJobs(searchParams),
    });
  },

  useGetJobById: (jobId: string) => {
    return useQuery({
      queryKey: [JOB_BY_ID_QUERY_KEY, jobId],
      queryFn: () => jobAPI.getJobById(jobId),
    });
  },
};
