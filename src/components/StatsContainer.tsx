import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import StatItem from './StatItem';
import { DefaultStats } from 'src/infrasctucture/job/types';

type StatsContainerProps = {
  defaultStats: DefaultStats;
};

const StatsContainer = ({ defaultStats }: StatsContainerProps) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats.pending,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats.interview,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined applications',
      count: defaultStats.declined,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <section className="grid gap-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatItem key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default StatsContainer;
