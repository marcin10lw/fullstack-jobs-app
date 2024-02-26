import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import StatItem from '../stats/StatItem';
import { useNavigate } from 'react-router-dom';
import { userRepository } from 'src/infrasctucture/user/userRepository';
import { useLayoutEffect } from 'react';
import { toast } from 'react-toastify';

const AdminContent = () => {
  const navigate = useNavigate();

  const {
    data: appStats,
    status,
    isError,
  } = userRepository.useGetAllUsersStats();

  useLayoutEffect(() => {
    if (isError) {
      toast.error("You're not authorized to view this page", {
        position: 'top-center',
      });
      navigate('/dashboard');
    }
  }, [isError, navigate]);

  if (status === 'success') {
    const { jobs, users } = appStats;

    return (
      <section className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        <StatItem
          title="current users"
          count={users}
          color="text-foreground"
          icon={<FaSuitcaseRolling className="size-10" />}
        />
        <StatItem
          title="current jobs"
          count={jobs}
          color="text-foreground"
          icon={<FaCalendarCheck className="size-10" />}
        />
      </section>
    );
  }
  return <></>;
};
export default AdminContent;
