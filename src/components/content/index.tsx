import React from 'react';
import { useStoreon } from 'storeon/react';

import { Loader } from '@components/loader';
import { Row } from '@components/row';

import styles from './content.module.scss';

/**
 * Component for render content
 *
 * @returns {React.ReactElement} - element
 */
export const Content = (): React.ReactElement => {
  const {
    movies,
    movie: { active, id, errorMessage, isLoading },
  } = useStoreon('movies', 'movie');

  const isError = movies.errorMessage || errorMessage;

  if (isLoading) {
    return (
      <div className={styles.wrap}>
        <div className={styles.wrapLoader}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      {isError ? (
        <p className={styles.error}>{isError}</p>
      ) : (
        <React.Fragment>
          {active && (
            <React.Fragment>
              <div
                className={styles.wrapbg}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/images/${id}.jpg)`,
                  height: '200px',
                }}
              />
              <div className={styles.wrapContent}>
                <h1>
                  {active.title} (Episode: {active.episode_id})
                </h1>
                <Row name="Release date:" value={new Date(active.release_date).toDateString()} />
                <Row name="Director:" value={active.director} />
                <Row name="Producer:" value={active.producer} />
                <p className={styles.text}>{active.opening_crawl}</p>
                <Row name="Characters:" value={active.characters} />
                <Row name="Planets:" value={active.planets} />
                <Row name="Species:" value={active.species} />
                <Row name="Starships:" value={active.starships} />
                <Row name="Vehicles:" value={active.vehicles} />
                <Row name="Date created:" value={new Date(active.created).toDateString()} />
                <Row name="Date edited:" value={new Date(active.edited).toDateString()} />
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </section>
  );
};
