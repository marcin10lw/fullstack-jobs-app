import { useQuery } from '@tanstack/react-query';
import { ALL_USERS_STATS_QUERY_KEY, CURRENT_USER_QUERY_KEY } from './constants';
import { userAPI } from './userApiAdapter';

export const userRepository = {
  useGetCurrentUser: () =>
    useQuery({
      queryKey: [CURRENT_USER_QUERY_KEY],
      queryFn: userAPI.getCurrentUser,
      retry: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }),

  useGetAllUsersStats: () =>
    useQuery({
      queryKey: [ALL_USERS_STATS_QUERY_KEY],
      queryFn: userAPI.getAllUsersStats,
      retry: 0,
    }),
};
