import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Users } from 'lucide-react';

import { userRepository } from 'src/infrasctucture/user/userRepository';
import StatItem from 'src/components/StatItem';
import { useToast } from 'src/components/ui/use-toast';

const GeneralStats = () => {
  const navigate = useNavigate();

  const {
    data: appStats,
    status,
    isError,
  } = userRepository.useGetAllUsersStats();

  const { toast } = useToast();

  useLayoutEffect(() => {
    if (isError) {
      toast({
        title: "You're not authorized to view this page",
        variant: 'destructive',
      });
      navigate('/dashboard');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, navigate]);

  if (status === 'success') {
    const { jobs, users } = appStats;

    return (
      <section className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        <StatItem
          title="current users"
          count={users}
          color="text-foreground"
          icon={<Users className="size-10" />}
        />
        <StatItem
          title="current jobs"
          count={jobs}
          color="text-foreground"
          icon={<CalendarCheck className="size-10" />}
        />
      </section>
    );
  }
  return <></>;
};
export default GeneralStats;
