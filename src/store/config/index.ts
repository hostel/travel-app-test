import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { movies } from '@store/movies';
import { movie } from '@store/movie';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const store = createStoreon<any, any>([
  movies.store,
  movie.store,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
]);
