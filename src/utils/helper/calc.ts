import { TCoodrinates, vertical } from '../constants';

export const calculateIndices: (
  row: number,
  col: number,
  align: string,
  color: string,
  size: number,
) => TCoodrinates[] = (row, col, align, color, size) => {
  let res: TCoodrinates[] = [];
  for (let i = 0; i < size; i++) {
    if (align === vertical)
      res = [...res, { i: row + i, j: col, color }];
    else res = [...res, { i: row, j: col + i, color }];
  }

  return res;
};
