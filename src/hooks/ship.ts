import toast from 'react-simple-toasts';
import { useAppDispatch, usePositionStateSelector } from '.';

import {
  addShipPosition,
  removeShipPositions,
} from 'store/reducers/positionState';
import { build, reset } from 'store/reducers/shipsState';

import { GRID_SIZE, SHIPS, TCoodrinates } from 'utils/constants';
import { calculateIndices } from 'utils/helper/calc';

export const useShipPosition = () => {
  const { shipPositions } = usePositionStateSelector();
  const dispatch = useAppDispatch();

  const setShipPosition = (
    name: string,
    position: TCoodrinates,
    align: string,
    callback?: () => void
  ) => {
    const { i, j } = position;
    const positions: TCoodrinates[] = calculateIndices(
      i,
      j,
      align,
      SHIPS[name].color,
      SHIPS[name].shots
    );
    const indices = positions.map((value) => {
      return { i: value.i, j: value.j };
    });
    if (!checkShipPosition(indices, name)) return;
    dispatch(addShipPosition(positions));
    dispatch(
      build({
        index: positions.map((value) => {
          return { i: value.i, j: value.j };
        }),
        name,
      })
    );
    if (callback) callback();
  };

  const checkShipPosition: (
    positions: { i: number; j: number }[],
    name: string
  ) => boolean = (positions, name) => {
    const COLOR = SHIPS[name].color;
    const shipAlreadyExists = shipPositions.find((x) => x.color === COLOR);
    const validPosition = positions.every(
      (x) =>
        x.i >= 0 &&
        x.i < GRID_SIZE &&
        x.j >= 0 &&
        x.j < GRID_SIZE &&
        shipPositions.find(
          (y) => y.i === x.i && y.j === x.j && y.color !== COLOR
        ) === undefined
    );

    if (shipAlreadyExists && validPosition) {
      dispatch(removeShipPositions(SHIPS[name].color));
      dispatch(reset(name));
      return true;
    } else if (validPosition) {
      return true;
    }

    if (!validPosition) {
      toast('Invalid selections, please choose another position');
    }
    return false;
  };

  return { setShipPosition, checkShipPosition };
};
