import { useQuery } from '@tanstack/react-query';
import { CURRENT_USER_QUERY_KEY } from './constants';
import { userAPI } from './userApiAdapter';

export const userRepository = {
  useGetCurrentUser: () =>
    useQuery({
      queryKey: [CURRENT_USER_QUERY_KEY],
      queryFn: userAPI.getCurrentUser,
      retry: false,
      cacheTime: 0,
    }),
};
