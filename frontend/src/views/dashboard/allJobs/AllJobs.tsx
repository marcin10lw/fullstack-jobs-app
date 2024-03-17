import { jobRepository } from 'src/infrasctucture/job/jobRepository';
import JobsContainer from 'src/views/dashboard/allJobs/allJobsList/JobsContainer';
import SearchContainer from 'src/views/dashboard/allJobs/search/SearchContainer';
import AllJobsSkeleton from './AllJobsSkeleton';

const AllJobs = () => {
  const {
    data: jobsData,
    isLoading,
    isSuccess,
  } = jobRepository.useGetAllJobs();

  if (isLoading) return <AllJobsSkeleton />;
  if (isSuccess) {
    return (
      <>
        <SearchContainer />
        <JobsContainer jobsData={jobsData} />
      </>
    );
  }
  return <></>;
};

export default AllJobs;
