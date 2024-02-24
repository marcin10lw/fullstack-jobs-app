import { cn } from 'src/lib/utils';

type ContentWrapperElementProps = React.HTMLAttributes<HTMLDivElement>;

interface ContentWrapperProps extends ContentWrapperElementProps {
  title: string;
  children: React.ReactNode;
}

const ContentWrapper = ({
  title,
  children,
  className,
}: ContentWrapperProps) => {
  return (
    <div
      className={cn(
        'm-auto w-full max-w-screen-xl rounded-lg bg-secondary p-[3rem_2rem_4rem] shadow-xl',
        className,
      )}
    >
      <h4 className="mb-8">{title}</h4>
      {children}
    </div>
  );
};

export default ContentWrapper;
