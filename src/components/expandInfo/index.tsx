import React, { useState } from 'react';

import { Loader } from '@components/loader';
import { loadInfo } from '@utils/loadInfo';

import styles from './expandInfo.module.scss';

interface IProps {
  data: string[];
}

/**
 * Component for render expanded info
 *
 * @param {IProps} data - array of url
 * @returns {React.ReactElement} - element
 */
export const ExpandInfo = ({ data }: IProps): React.ReactElement => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setStatus] = useState(false);
  const [text, setText] = useState('');

  /**
   * Method for change visibility content and fetch some info
   */
  const changeVisbilityAndFecthData = async (): Promise<void> => {
    setVisible(true);
    setStatus(true);
    const text = await loadInfo(data);
    setText(text);
    setStatus(false);
  };

  return (
    <React.Fragment>
      {!isVisible && !isLoading && (
        <button className={styles.button} onClick={changeVisbilityAndFecthData}>
          Show
        </button>
      )}
      {isLoading && (
        <span className={styles.wrapLoader}>
          <Loader />
        </span>
      )}
      {isVisible && !isLoading && <p className={styles.text}>{text}</p>}
    </React.Fragment>
  );
};
