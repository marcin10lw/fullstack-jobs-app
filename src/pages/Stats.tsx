import NotFound from 'src/components/NotFound';

import ChartsContainer from 'src/components/ChartsContainer';
import StatsContainer from 'src/components/StatsContainer';
import { jobRepository } from 'src/infrasctucture/job/jobRepository';

const Stats = () => {
  const { data, status } = jobRepository.useGetJobStats();

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
