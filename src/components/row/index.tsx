import React from 'react';

import { ExpandInfo } from '@components/expandInfo';

import styles from './row.module.scss';

interface IProps {
  name: string;
  value: string | string[];
}

/**
 * Component for render row in film
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Row = ({ name, value }: IProps): React.ReactElement => {
  const isArr = Array.isArray(value);

  return (
    <div className={isArr ? styles.wrap : ''}>
      <span className={styles.name}>{name}</span>
      {isArr ? (
        <ExpandInfo data={value as string[]} />
      ) : (
        <span className={styles.value}>{value}</span>
      )}
    </div>
  );
};
