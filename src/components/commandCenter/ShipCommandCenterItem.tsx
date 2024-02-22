import React from 'react';
import styles from './index.module.css';

interface IShipCommandCenterItem {
  name: string;
  shots: number;
  color: string;
}
const ShipCommandCenterItem: React.FC<IShipCommandCenterItem> = ({
  name,
  shots,
  color,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <span style={{ background: color }} className={styles.circle}></span>
        <h4>{name}</h4>
      </div>
      <div>{shots}</div>
    </div>
  );
};

export default ShipCommandCenterItem;
