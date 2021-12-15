import React from 'react';
import { Provider } from 'react-redux';

import { Main } from '@pages/main';
import { store } from '@store/store';

/**
 * Main component for all components
 *
 * @returns {React.ReactElement} - element
 */
export const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
