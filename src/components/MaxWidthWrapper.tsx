import { PropsWithChildren } from 'react';
import { cn } from 'src/lib/utils';
import { ClassNameValue } from 'tailwind-merge';

const MaxWidthWrapper = ({
  className,
  children,
}: PropsWithChildren<{ className?: ClassNameValue }>) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
