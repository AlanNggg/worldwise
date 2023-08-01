/* eslint-disable react/button-has-type */
import { PropsWithChildren } from 'react';
import styles from './Button.module.css';

interface Props extends PropsWithChildren {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: 'primary' | 'back' | 'position';
}

function Button({ children, onClick, type }: Props) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
