import { Wrapper } from "src/assets/wrappers/StatItem";

type StatItemProps = {
  count: number;
  title: string;
  icon: JSX.Element;
  color: string;
  bcg: string;
};

const StatItem = ({ bcg, color, count, icon, title }: StatItemProps) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
