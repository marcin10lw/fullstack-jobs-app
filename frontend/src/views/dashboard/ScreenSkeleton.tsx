import { ClassValue } from 'clsx';

import { Skeleton } from 'src/components/ui/skeleton';
import { cn } from 'src/lib/utils';

const ScreenSkeleton = ({ className }: { className?: ClassValue }) => {
  return (
    <Skeleton className={cn('min-h-[calc(100vh-64px-72px)] w-full md:min-h-[calc(100vh-64px-96px)]', className)} />
  );
};

export default ScreenSkeleton;
