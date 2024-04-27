import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ALL_JOBS_QUERY_KEY, JOB_BY_ID_QUERY_KEY, JOB_STATS_QUERY_KEY } from './constants';
import { jobAPI } from './jobApiAdapter';
import { searchParamsDefaultValues } from 'src/views/dashboard/allJobs/search/constants';

export const jobRepository = {
  useGetAllJobs: () => {
    const [searchParams] = useSearchParams(searchParamsDefaultValues);

    const getAllJobsQuery = useQuery({
      queryKey: [ALL_JOBS_QUERY_KEY],
      queryFn: () => jobAPI.getAllJobs(searchParams),
    });

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        getAllJobsQuery.refetch();
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return getAllJobsQuery;
  },

  useGetJobById: (jobId: string) => {
    return useQuery({
      queryKey: [JOB_BY_ID_QUERY_KEY, jobId],
      queryFn: () => jobAPI.getJobById(jobId),
      retry: 1,
    });
  },

  useGetJobStats: () => {
    return useQuery({
      queryKey: [JOB_STATS_QUERY_KEY],
      queryFn: jobAPI.getJobStats,
    });
  },
};
