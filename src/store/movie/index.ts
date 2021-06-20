import { StoreonModule, StoreonEvents } from 'storeon';

import { IMovie, fetchMovie } from '@api/movies';
import { REJECT_REQUEST } from '@constants/errors';

interface IModifedMovie {
  active: IMovie | null;
  isLoading: boolean;
  errorMessage: string;
  id: null | number;
}

interface Store {
  movie: IModifedMovie;
}

export interface IEvents extends StoreonEvents<Store> {
  'movie/set': IModifedMovie;
  'movie/fetchMovie': number;
}

interface IActions {
  set: 'movie/set';
  fetchMovie: 'movie/fetchMovie';
}

export const actions: IActions = {
  set: 'movie/set',
  fetchMovie: 'movie/fetchMovie',
};

/**
 * Store for active movie
 *
 * @param {Store} store - Current store
 */
const store: StoreonModule<Store, IEvents> = (store) => {
  store.on('@init', () => ({
    movie: {
      active: null,
      isLoading: false,
      errorMessage: '',
      id: null,
    },
  }));
  store.on(actions.set, (_, data) => ({ movie: data }));
  store.on(actions.fetchMovie, async ({ movie }, id) => {
    store.dispatch(actions.set, {
      ...movie,
      isLoading: true,
      errorMessage: '',
    });
    try {
      const result = await fetchMovie(id);
      store.dispatch(actions.set, { ...movie, active: result, id, isLoading: false });
    } catch {
      store.dispatch(actions.set, {
        ...movie,
        isLoading: false,
        errorMessage: REJECT_REQUEST,
      });
    }
  });
};

export const movie = {
  ...actions,
  store,
};
