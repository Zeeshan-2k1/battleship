import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.css';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  customClassName?: string;
  size?: 'regular' | 'small';
}
function Button({
  children,
  customClassName = '',
  size,
  ...props
}: IButton): JSX.Element {
  if (size === 'small') {
    return (
      <button
        className={`${styles.button} ${customClassName} py-2 px-4`}
        type={props.type}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...props}
      className={`${styles.button} ${customClassName} px-6 py-4 `}
    >
      {children}
    </button>
  );
}

export default Button;
