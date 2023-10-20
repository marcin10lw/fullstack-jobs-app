type StatItemProps = {
  count: number;
  title: string;
  icon: JSX.Element;
  color: string;
  bcg: string;
};

const StatItem = ({ bcg, color, count, icon, title }: StatItemProps) => {
  return (
    <article
      style={{ borderBottomColor: color }}
      className={`rounded-[--border-radius] border-b-[5px] bg-[--background-secondary-color] p-8`}
    >
      <header className="flex items-center justify-between">
        <span
          style={{ color: color }}
          className={`block text-5xl font-bold leading-loose`}
        >
          {count}
        </span>
        <div
          style={{ backgroundColor: bcg, color: color }}
          className="flex h-[60px] w-[70px] items-center justify-center rounded-[--border-radius]"
        >
          <span className="w-8">{icon}</span>
        </div>
      </header>
      <h5 className="mt-2 text-left text-lg capitalize tracking-[--letter-spacing]">
        {title}
      </h5>
    </article>
  );
};
export default StatItem;
