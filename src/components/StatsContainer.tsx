import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";

import { DefaultStats } from "src/types";
import { Wrapper } from "src/assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

type StatsContainerProps = {
  defaultStats: DefaultStats;
};

const StatsContainer = ({ defaultStats }: StatsContainerProps) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats.pending,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats.interview,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "declined applications",
      count: defaultStats.declined,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {stats.map((stat) => (
        <StatItem key={stat.title} {...stat} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
