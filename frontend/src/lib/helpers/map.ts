import { LatLngBoundsExpression } from 'leaflet';

export const convertBoundingBoxToBounds = (boundingbox: string[]) => {
  return [
    [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
    [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])],
  ] as LatLngBoundsExpression;
};
