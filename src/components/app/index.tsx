import React from 'react';
import { StoreContext } from 'storeon/react';
import axios from 'axios';

import { Main } from '@components/main';
import { store } from '@store/config';

axios.defaults.baseURL = 'https://swapi.dev/api/';

/**
 * Main component for all components
 *
 * @returns {React.ReactElement} - element
 */
export const App = (): React.ReactElement => {
  return (
    <StoreContext.Provider value={store}>
      <Main />
    </StoreContext.Provider>
  );
};
