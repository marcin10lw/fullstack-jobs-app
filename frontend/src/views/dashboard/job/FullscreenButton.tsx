import { Expand, Shrink } from 'lucide-react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { Button } from 'src/components/ui/button';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenButton = ({ isFullscreen, toggleFullscreen }: FullscreenButtonProps) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [isFullscreen, map]);

  return (
    <Button onClick={toggleFullscreen} variant="control" className="size-8 p-2">
      {isFullscreen ? <Shrink /> : <Expand />}
    </Button>
  );
};

export default FullscreenButton;
