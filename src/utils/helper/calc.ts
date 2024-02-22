import { TCoodrinates, vertical } from '../constants';

export const positionCalculator = ({
  rowName,
  colName,
  align,
  size,
  errorHandler,
}: {
  rowName: string;
  colName: string;
  align: string;
  size: number;
  errorHandler?: () => void;
}): number[] | null => {
  let factor = 1;
  if (align === vertical) factor = 11;

  const startIndex = calcIndex({ rowName, colName });
  if (checkCoordinate(factor * (size - 1) + startIndex)) {
    if (errorHandler) errorHandler();
    return null;
  }

  let result: number[] = [];
  for (let i = 0; i < size; i++) {
    result = [...result, startIndex + factor * i];
  }
  return result;
};

export const calcIndex = ({
  rowName,
  colName,
}: {
  rowName: string;
  colName: string;
}) => {
  const row: number = +rowName.split(' ')[1];
  const col: number = +colName.split(' ')[1];
  return (row - 1) * 11 + col - 1;
};

export const checkCoordinate = (index: number) => {
  return !(index >= 121 || index < 0);
};

// export const generatePositionIndexMap = (ships: {
//   [name: string]: TShipDetails;
// }): { [index: number]: string } => {
//   let index: { [index: number]: string } = {};
//   Object.values(ships).forEach((ship: TShipDetails) => {
//     let indexColorMap = {};
//     ship.index.forEach((item) => {
//       indexColorMap = {
//         ...indexColorMap,
//         [item]: SHIPS[ship.name].color,
//       };
//     });
//     index = { ...index, ...indexColorMap };
//   });

//   return index;
// };

export const calculateIndices: (
  row: number,
  col: number,
  align: string,
  color: string,
  size: number
) => TCoodrinates[] = (row, col, align, color, size) => {
  let res: TCoodrinates[] = [];
  for (let i = 0; i < size; i++) {
    if (align === vertical)
      res = [...res, { i: row + i, j: col, color: color }];
    else res = [...res, { i: row, j: col + i, color: color }];
  }

  return res;
};

export const isEmpty = (s: string): boolean => {
  return s === null || s === undefined || s.length === 0;
};
