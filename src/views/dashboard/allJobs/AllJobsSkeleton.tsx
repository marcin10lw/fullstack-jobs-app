import { Skeleton } from 'src/components/ui/skeleton';

const AllJobsSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-180px)] w-full flex-col gap-12">
      <Skeleton className="h-[440px] w-full md:h-[360px] lg:h-[290px]" />
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default AllJobsSkeleton;
