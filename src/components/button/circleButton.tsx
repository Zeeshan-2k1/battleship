import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

interface ICircleButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  define?: string;
}
const CircleButton: React.FC<ICircleButton> = ({
  children,
  define,
  ...props
}) => {
  return (
    <button
      {...props}
      data-after-content={define}
      className={`${styles.circle}`}
    >
      {children}
    </button>
  );
};

export default CircleButton;
