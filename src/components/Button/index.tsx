import React, { HTMLAttributes } from 'react';
import styles from './button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: 'primary' | 'back' | 'position';
}

export default function Button({
  children,
  onClick,
  color = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[color]}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
