import React, { useCallback, useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';

import { Sidebar } from '@components/sidebar';
import { Content } from '@components/content';
import { Loader } from '@components/loader';
import { Form } from '@components/form';
import { actions as moviesActions } from '@store/movies';

import styles from './main.module.scss';

/**
 * Wrapper for sidebar and content
 *
 * @returns {React.ReactElement} - element
 */
export const Main = (): React.ReactElement => {
  const [isContent, set] = useState(true);
  const { dispatch, movies } = useStoreon('movies');

  useEffect(() => {
    dispatch(moviesActions.fetchMovies);
  }, []);

  const toggleVisibility = useCallback(() => {
    set(!isContent);
  }, [isContent]);

  return (
    <div className={styles.wrap}>
      {movies.isLoading ? (
        <div className={styles.wrapLoader}>
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          {isContent ? (
            <div className={styles.grid}>
              <Sidebar list={movies.listNames} toggleVisibility={toggleVisibility} />
              <Content />
            </div>
          ) : (
            <Form toggleVisibility={toggleVisibility} />
          )}
        </React.Fragment>
      )}
    </div>
  );
};
