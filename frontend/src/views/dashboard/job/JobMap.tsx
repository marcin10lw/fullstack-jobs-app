import { useState } from 'react';

import BaseMap from 'src/components/map/BaseMap';
import SearchMap from './SearchMap';
import { cn } from 'src/lib/utils';
import FullscreenButton from './FullscreenButton';

const JobMap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      className={cn({
        'fixed inset-0': isFullscreen,
        'relative min-h-[500px] w-full overflow-hidden rounded-xl xl:aspect-video xl:min-h-full':
          !isFullscreen,
      })}
    >
      <BaseMap>
        <div className="absolute right-4 top-4 z-[1002]">
          <FullscreenButton
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </div>
        <div className="absolute left-0 top-0 z-[1001] ml-4 mt-4 w-full">
          <SearchMap />
        </div>
      </BaseMap>
    </div>
  );
};

export default JobMap;
