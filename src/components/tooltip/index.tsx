import React from 'react';
import styles from './style.module.css';

interface ITooltip {
  children: React.ReactNode;
  direction: 'top' | 'down' | 'right' | 'left';
  tooltipText: string;
}
const Tooltip: React.FC<ITooltip> = ({ children, direction, tooltipText }) => {
  return (
    <div className={styles.hoverText}>
      {children}
      <span className={`${styles.tooltipText} ${styles[direction]}`}>
        {tooltipText}
      </span>
    </div>
  );
};

export default Tooltip;
