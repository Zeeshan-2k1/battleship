import { SHIPS, horizontal, vertical } from '../constants';

export const getShipNameByColor = (color?: string): string | null => {
  if (!color) return null;
  return Object.values(SHIPS).find((x) => x.color === color)?.name ?? null;
};

export const getShipOrientation = (
  position: { i: number; j: number }[],
): string => {
  if (position.length) {
    return position[0].i === position[1].i ? vertical : horizontal;
  }
  return '';
};
