import React from 'react';
import styles from './grid.module.css';

import { GRID_SIZE } from 'utils/constants';

interface IGridContainerProps {
  indexes: { i: number; j: number; color: string }[];
  variant?: 'sm' | 'md' | 'lg';
  onClick?: (data: any) => any;
  isAttackGrid?: boolean;
}
const GridContainer: React.FC<IGridContainerProps> = ({
  indexes,
  variant = 'md',
  onClick,
  isAttackGrid,
}) => {
  const width =
    variant === 'md'
      ? 'min-w-[68px]'
      : variant === 'lg'
      ? 'min-w-16'
      : 'min-w-10';
  return (
    <div className={`${styles.gridContainer}`}>
      {Array(GRID_SIZE)
        .fill(Array(GRID_SIZE).fill(''))
        .map((arr, iIndex) => {
          return arr.map((_: any, jIndex: number) => {
            let color;
            indexes.forEach((value) => {
              if (value.i === iIndex && value.j === jIndex) color = value.color;
            });
            if (color)
              return (
                <div
                  style={{ background: color }}
                  className={`flex justify-center items-center ${width}`}
                  key={iIndex + '' + jIndex}
                ></div>
              );

            return (
              <div
                className={`flex justify-center items-center ${width} ${
                  isAttackGrid ? 'hover:scale-105' : ''
                }`}
                key={iIndex + '' + jIndex}
                onClick={() => {
                  if (onClick) {
                    onClick({ i: iIndex, j: jIndex });
                  }
                }}
              ></div>
            );
          });
        })}
    </div>
  );
};

export default GridContainer;
