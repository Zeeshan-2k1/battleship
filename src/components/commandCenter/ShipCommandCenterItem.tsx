import React from 'react';
import styles from './index.module.css';

interface IShipCommandCenterItem {
  name: string;
  shots: number;
  color: string;
}
function ShipCommandCenterItem({
  name,
  shots,
  color,
}: IShipCommandCenterItem): JSX.Element {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <span style={{ background: color }} className={styles.circle} />
        <h4>{name}</h4>
      </div>
      <div>{shots}</div>
    </div>
  );
}
export default ShipCommandCenterItem;
