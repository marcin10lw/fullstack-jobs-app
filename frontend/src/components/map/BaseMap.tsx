import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { ClassValue } from 'clsx';
import { cn } from 'src/lib/utils';

interface BaseMapProps {
  children?: React.ReactNode;
  className?: ClassValue;
}

const BaseMap = ({ children, className }: BaseMapProps) => {
  return (
    <MapContainer
      className={cn('absolute inset-0 z-[0] w-full', className)}
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={18}
      attributionControl={false}
      zoomControl={false}
      maxBounds={[
        [90, 240],
        [90, -240],
        [-90, -240],
        [-90, 240],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {children}
    </MapContainer>
  );
};

export default BaseMap;
