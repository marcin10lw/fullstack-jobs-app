import { cn } from 'src/lib/utils';

type ContentWrapperElementProps = React.HTMLAttributes<HTMLDivElement>;

interface ContentWrapperProps extends ContentWrapperElementProps {
  title?: string;
  children?: React.ReactNode;
}

const ContentWrapper = ({ title, children, className }: ContentWrapperProps) => {
  return (
    <div
      className={cn(
        'm-auto w-full max-w-screen-xl rounded-lg bg-secondary p-4 shadow-xl md:p-[2.5rem_2rem_3.5rem]',
        className,
      )}
    >
      <div>{title && <h4 className="mb-8 text-lg font-semibold tracking-wider">{title}</h4>}</div>
      {children}
    </div>
  );
};

export default ContentWrapper;
