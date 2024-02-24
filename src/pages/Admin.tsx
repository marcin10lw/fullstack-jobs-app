import { useLayoutEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import customFetch from 'src/helpers/customFetch';
import StatItem from 'src/views/dashboard/stats/StatItem';

const Admin = () => {
  const navigate = useNavigate();

  const {
    data: appStats,
    status,
    isError,
  } = useQuery({
    queryKey: ['app-stats'],
    queryFn: async (): Promise<{ users: number; jobs: number }> => {
      const { data } = await customFetch.get('/users/admin/app-stats');
      return data;
    },
    retry: 0,
  });

  useLayoutEffect(() => {
    if (isError) {
      toast.error("You're not authorized to view this page", {
        position: 'top-center',
      });
      navigate('/dashboard');
    }
  }, [isError]);

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
export default Admin;
