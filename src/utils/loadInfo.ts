import axios, { AxiosResponse } from 'axios';

interface IPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string;
  starships: string;
  created: string;
  edited: string;
  url: string;
}

interface IPlanets {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface IStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string;
  created: string;
  edited: string;
  url: string;
}

interface IVehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string;
  created: string;
  edited: string;
}

interface ISpecies {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

/**
 * Utility function for fetch some info about movie
 *
 * @param {string[]} urls - array of urls
 * @returns {Promise<string>} - string
 */
export const loadInfo = async (urls: string[]): Promise<string> => {
  const responses = (await Promise.all(
    urls.map((item) => {
      const splitedItem = item.split('api');
      const url = splitedItem[2].slice(1);

      return axios({ method: 'GET', url });
    })
  )) as AxiosResponse<IPeople | IPlanets | IStarship | IVehicle | ISpecies>[];

  const list = responses.reduce((acc: string[], item) => {
    if (item.data.name) {
      acc.push(item.data.name);
    }

    return acc;
  }, []);

  return list.join(', ');
};
