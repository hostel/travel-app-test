import React, { CSSProperties } from 'react';

import styles from './loader.module.scss';

export interface Variable extends CSSProperties {
  '--n': number;
}

/**
 * Loader spinner component
 *
 * @returns {React.ReactElement} - element
 */
export const Loader = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className={styles.circle}>
    <circle style={{ '--n': 0 } as Variable} cx="15.25" cy="3.25" r="3.25" />
    <circle style={{ '--n': 1 } as Variable} cx="22.37" cy="5.64" r="3.25" />
    <circle style={{ '--n': 2 } as Variable} cx="26.47" cy="11.49" r="3.25" />
    <circle style={{ '--n': 3 } as Variable} cx="26.43" cy="18.41" r="3.25" />
    <circle style={{ '--n': 4 } as Variable} cx="22.1" cy="24.55" r="3.25" />
    <circle style={{ '--n': 5 } as Variable} cx="15.25" cy="26.75" r="3.25" />
    <circle style={{ '--n': 6 } as Variable} cx="8.14" cy="24.36" r="3.25" />
    <circle style={{ '--n': 7 } as Variable} cx="4.03" cy="18.51" r="3.25" />
    <circle style={{ '--n': 8 } as Variable} cx="4.07" cy="11.14" r="3.25" />
    <circle style={{ '--n': 9 } as Variable} cx="8.4" cy="5.45" r="3.25" />
  </svg>
);
