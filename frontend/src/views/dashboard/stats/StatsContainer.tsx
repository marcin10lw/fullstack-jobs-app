import { Briefcase, Bug, CalendarCheck } from 'lucide-react';

import { DefaultStats } from 'src/api/job/types';
import StatItem from 'src/components/StatItem';

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
      icon: <Briefcase className="size-8 text-muted-foreground" />,
      color: 'text-foreground',
    },
    {
      id: 2,
      status: 'interview',
      title: 'interviews scheduled',
      count: defaultStats.interview,
      icon: <CalendarCheck className="size-8 text-primary" />,
      color: 'text-foreground',
    },
    {
      id: 3,
      status: 'declined',
      title: 'declined applications',
      count: defaultStats.declined,
      icon: <Bug className="size-8 text-destructive_2" />,
      color: 'text-foreground',
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
