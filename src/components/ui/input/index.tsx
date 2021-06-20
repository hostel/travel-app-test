import React from 'react';

import styles from './input.module.scss';

interface IProps {
  value?: string;
  type?: string;
  name?: string;
  placeholder: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * UI Component Input
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Input = ({
  value,
  type = 'text',
  name,
  onChange,
  required,
  placeholder,
}: IProps): React.ReactElement => (
  <input
    className={styles.input}
    onChange={onChange}
    value={value}
    type={type}
    name={name}
    required={required}
    placeholder={placeholder}
  />
);
