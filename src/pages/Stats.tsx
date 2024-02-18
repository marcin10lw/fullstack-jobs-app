import { useQuery } from '@tanstack/react-query';
import { ChartsContainer, StatsContainer } from 'src/components';
import NotFound from 'src/components/NotFound';

import { ApiStatsResponse } from 'src/types';
import customFetch from 'src/helpers/customFetch';

const Stats = () => {
  const { data, status } = useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<ApiStatsResponse> => {
      const { data } = await customFetch.get(`/jobs/stats`);
      return data;
    },
  });

  if (status === 'error') return <NotFound text="Could not get stats" />;

  if (status === 'success') {
    const { defaultStats, monthlyApplications } = data;

    return (
      <>
        <StatsContainer defaultStats={defaultStats} />
        {monthlyApplications.length > 1 && (
          <ChartsContainer monthlyApplications={monthlyApplications} />
        )}
      </>
    );
  }

  return <></>;
};
export default Stats;
