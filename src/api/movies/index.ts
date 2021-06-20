import axios from 'axios';

export interface IMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IMovies {
  count: number;
  next: null;
  previous: null;
  results: IMovie[];
}

/**
 * Fetch movies list
 *
 * @returns {Promise<IMovies>} - promise with response
 *
 */
export const fetchMovies = async (): Promise<IMovies> => {
  const { data } = await axios({
    method: 'GET',
    url: 'films',
  });

  return data;
};

/**
 * Fetch movie by id
 *
 * @param {number} id - id movie
 * @returns {Promise<IMovie>} - promise with response
 *
 */
export const fetchMovie = async (id: number): Promise<IMovie> => {
  const { data } = await axios({
    method: 'GET',
    url: `films/${id}/`,
  });

  return data;
};
