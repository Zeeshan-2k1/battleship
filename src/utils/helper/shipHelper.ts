import { SHIPS } from '../constants';

export const getShipNameByColor = (color?: string) => {
  if (!color) return null;
  return Object.values(SHIPS).find((x) => x.color === color)?.name;
};

export const getShipOrientation = (position: { i: number; j: number }[]) => {
  if (position.length) {
    return position[0].i === position[1].i ? 'vertical' : 'horizontal';
  } else {
    return '';
  }
};
