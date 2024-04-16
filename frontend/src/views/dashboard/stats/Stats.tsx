import NotFound from 'src/components/NotFound';
import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import ChartsContainer from 'src/views/dashboard/stats/ChartsContainer';
import StatsContainer from 'src/views/dashboard/stats/StatsContainer';
import ScreenSkeleton from '../ScreenSkeleton';

const Stats = () => {
  const { data, status } = jobRepository.useGetJobStats();

  if (status === 'loading') return <ScreenSkeleton />;

  if (status === 'error') return <NotFound text="Could not get stats" />;

  if (status === 'success') {
    const { defaultStats, monthlyApplications } = data;

    return (
      <>
        <StatsContainer defaultStats={defaultStats} />
        <ChartsContainer monthlyApplications={monthlyApplications} />
      </>
    );
  }

  return <></>;
};
export default Stats;
