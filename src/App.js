import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import configureStore from './config/configureStore';
import AppWithNavigationState from './navigators/AppNavigator';
import 'regenerator-runtime/runtime';
const { store, persistor } = configureStore();
// persistor.purge();
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppWithNavigationState />
    </PersistGate>
  </Provider>
);
export default App;
