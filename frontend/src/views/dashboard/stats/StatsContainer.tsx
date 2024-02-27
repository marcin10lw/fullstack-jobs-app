import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

import { DefaultStats } from 'src/infrasctucture/job/types';
import StatItem from './StatItem';

type StatsContainerProps = {
  defaultStats: DefaultStats;
};

const StatsContainer = ({ defaultStats }: StatsContainerProps) => {
  const stats = [
    {
      id: 1,
      status: 'pending',
      title: 'pending applications',
      count: defaultStats.pending,
      icon: <FaSuitcaseRolling className="size-8 text-muted-foreground" />,
      color: 'test-primary-foreground',
    },
    {
      id: 2,
      status: 'interview',
      title: 'interviews scheduled',
      count: defaultStats.interview,
      icon: <FaCalendarCheck className="size-8 text-primary/80" />,
      color: 'text-purple-700',
    },
    {
      id: 3,
      status: 'declined',
      title: 'declined applications',
      count: defaultStats.declined,
      icon: <FaBug className="size-8 text-destructive" />,
      color: 'text-red-800',
    },
  ];

  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:gap-x-4 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatItem key={stat.id} {...stat} />
      ))}
    </section>
  );
};

export default StatsContainer;
