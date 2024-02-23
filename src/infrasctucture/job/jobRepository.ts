import { useQuery } from '@tanstack/react-query';
import { GET_ALL_JOBS_QUERY_KEY } from './constants';
import { jobAPI } from './jobApiAdapter';
import { useSearchParams } from 'react-router-dom';

export const jobRepository = {
  useGetAllJobs: () => {
    const [searchParams] = useSearchParams();

    return useQuery({
      queryKey: [GET_ALL_JOBS_QUERY_KEY],
      queryFn: () => jobAPI.getAllJobs(searchParams),
      keepPreviousData: true,
      cacheTime: 0,
    });
  },
};
