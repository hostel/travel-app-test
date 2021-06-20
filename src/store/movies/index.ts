import { StoreonModule, StoreonEvents } from 'storeon';

import { IMovies, fetchMovies } from '@api/movies';
import { REJECT_REQUEST } from '@constants/errors';

export interface IListItem {
  title: string;
  id: number;
}

interface IModifedMovies extends IMovies {
  listNames: IListItem[];
  isLoading: boolean;
  errorMessage: string;
}

interface Store {
  movies: IModifedMovies;
}

export interface IEvents extends StoreonEvents<Store> {
  'movies/set': IModifedMovies;
  'movies/fetchMovies': undefined;
}

interface IActions {
  set: 'movies/set';
  fetchMovies: 'movies/fetchMovies';
}

export const actions: IActions = {
  set: 'movies/set',
  fetchMovies: 'movies/fetchMovies',
};

/**
 * Store for films
 *
 * @param {Store} store - Current store
 */
const store: StoreonModule<Store, IEvents> = (store) => {
  store.on('@init', () => ({
    movies: {
      count: 0,
      next: null,
      previous: null,
      results: [],
      listNames: [],
      isLoading: false,
      errorMessage: '',
    },
  }));
  store.on(actions.set, (_, data) => ({ movies: data }));
  store.on(actions.fetchMovies, async ({ movies }) => {
    store.dispatch(actions.set, {
      ...movies,
      isLoading: true,
      errorMessage: '',
    });

    try {
      const result = await fetchMovies();
      const listNames = result.results.map((item) => ({ title: item.title, id: item.episode_id }));

      store.dispatch(actions.set, {
        ...movies,
        ...result,
        listNames,
        isLoading: false,
      });
    } catch {
      store.dispatch(actions.set, {
        ...movies,
        isLoading: false,
        errorMessage: REJECT_REQUEST,
      });
    }
  });
};

export const movies = {
  ...actions,
  store,
};
