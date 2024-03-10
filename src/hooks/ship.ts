import toast from 'react-simple-toasts';
import { useAppDispatch, usePositionStateSelector } from '.';

import {
  addShipPosition,
  removeShipPositions,
  deleteAllShipPostions,
} from 'store/reducers/positionState';
import { build, reset, resetAll } from 'store/reducers/shipsState';

import {
  GRID_SIZE,
  SHIPS,
  TCoodrinates,
  horizontal,
  vertical,
} from 'utils/constants';
import { calculateIndices } from 'utils/helper/calc';

export const useShipPosition = () => {
  const { shipPositions } = usePositionStateSelector();
  const dispatch = useAppDispatch();

  const setShipPosition = (
    name: string,
    position: TCoodrinates,
    align: string,
    callback?: () => void,
  ) => {
    const { i, j } = position;
    const positions: TCoodrinates[] = calculateIndices(
      i,
      j,
      align,
      SHIPS[name].color,
      SHIPS[name].shots,
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
      }),
    );
    if (callback) callback();
  };

  const checkShipPosition: (
    positions: { i: number; j: number }[],
    name: string,
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
          (y) => y.i === x.i && y.j === x.j && y.color !== COLOR,
        ) === undefined,
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

  const generateShipPosition = () => {
    let shipPositions: TCoodrinates[] = [];

    dispatch(deleteAllShipPostions());
    dispatch(resetAll());

    const checkPositions = (positions: TCoodrinates[], color: string) =>
      positions.every(
        (x) =>
          x.i >= 0 &&
          x.i < GRID_SIZE &&
          x.j >= 0 &&
          x.j < GRID_SIZE &&
          shipPositions.find(
            (y) => y.i === x.i && y.j === x.j && y.color !== color,
          ) === undefined,
      );

    Object.values(SHIPS).forEach((ship) => {
      let positions: TCoodrinates[];

      do {
        const random = Math.random();
        const alignment: string = random > 0.5 ? horizontal : vertical;

        let i = 0,
          j = 0;
        if (alignment === horizontal) {
          j = Math.floor(random * (GRID_SIZE - ship.shots));
          i = Math.floor(random * GRID_SIZE);
        } else {
          i = Math.floor(random * (GRID_SIZE - ship.shots));
          j = Math.floor(random * GRID_SIZE);
        }

        positions = calculateIndices(i, j, alignment, ship.color, ship.shots);
      } while (!checkPositions(positions, ship.color));

      if (positions?.length) {
        dispatch(addShipPosition(positions));
        dispatch(
          build({
            index: positions.map((value) => {
              return { i: value.i, j: value.j };
            }),
            name: ship.name,
          }),
        );
        shipPositions = [...shipPositions, ...positions];
      }
    });
  };

  return { setShipPosition, checkShipPosition, generateShipPosition };
};
