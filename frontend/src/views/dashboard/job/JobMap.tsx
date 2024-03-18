import BaseMap from 'src/components/map/BaseMap';
import SearchMap from './SearchMap';

const JobMap = () => {
  return (
    <div className="relative  min-h-[500px] w-full overflow-hidden rounded-xl">
      <BaseMap>
        <div className="absolute left-0 top-0 z-[1000] ml-4 mt-4 w-full max-w-[260px]">
          <SearchMap />
        </div>
      </BaseMap>
    </div>
  );
};

export default JobMap;
