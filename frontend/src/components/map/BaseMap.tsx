import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

interface BaseMapProps {
  children?: React.ReactNode;
}

const BaseMap = ({ children }: BaseMapProps) => {
  return (
    <MapContainer
      className="absolute inset-0 z-[100] w-full"
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
