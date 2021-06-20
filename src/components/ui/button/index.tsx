import React from 'react';

import styles from './button.module.scss';

interface IProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: string | React.ReactElement;
}

/**
 * UI Component Button
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Button = ({ type = 'button', onClick, children }: IProps): React.ReactElement => (
  <button className={styles.button} type={type} onClick={onClick}>
    {children}
  </button>
);
