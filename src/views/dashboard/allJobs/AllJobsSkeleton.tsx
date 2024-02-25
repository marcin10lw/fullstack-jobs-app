import { Skeleton } from 'src/components/ui/skeleton';

const AllJobsSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-180px)] w-full flex-col gap-12">
      <Skeleton className="h-[440px] w-full shrink-0 md:h-[360px] lg:h-[290px]" />
      <div className="grid gap-8 xl:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[270px] w-full" />
        ))}
      </div>
    </div>
  );
};

export default AllJobsSkeleton;
