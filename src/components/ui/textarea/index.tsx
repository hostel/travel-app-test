import React from 'react';

import styles from './textarea.module.scss';

interface IProps {
  value?: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

/**
 * UI Component Textarea
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Textarea = ({ value, name, placeholder, required }: IProps): React.ReactElement => (
  <textarea
    value={value}
    name={name}
    placeholder={placeholder}
    required={required}
    className={styles.textarea}
  />
);
