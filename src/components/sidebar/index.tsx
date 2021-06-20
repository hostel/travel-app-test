import React from 'react';
import { useStoreon } from 'storeon/react';
import classNames from 'classnames';

import { Button } from '@components/ui/button';
import { IListItem } from '@store/movies';
import { actions as filmActions } from '@store/movie';

import styles from './sidebar.module.scss';

interface IProps {
  list: IListItem[];
  toggleVisibility: () => void;
}

/**
 * Component sidebar with list of films
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Sidebar = ({ list, toggleVisibility }: IProps): React.ReactElement => {
  const {
    dispatch,
    movie: { active, id },
  } = useStoreon('movie');

  /**
   * Set active film
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event - event from button
   */
  const onClick = ({ target }: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const dataset = (target as HTMLElement).dataset;
    if (dataset.index && dataset.index !== id) {
      dispatch(filmActions.fetchMovie, dataset.index);
    }
  };

  return (
    <aside className={styles.wrap}>
      {list.length === 0 ? null : (
        <React.Fragment>
          {list.map((item, index) => (
            <button
              className={classNames(styles.item, {
                [styles.active]: active && active.episode_id === item.id,
              })}
              key={item.id}
              data-index={index + 1}
              onClick={onClick}
            >
              {item.title}
            </button>
          ))}
          <div className={styles.wrapButton}>
            <Button onClick={toggleVisibility}> Select episode</Button>
          </div>
        </React.Fragment>
      )}
    </aside>
  );
};
