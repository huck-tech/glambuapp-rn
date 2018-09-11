import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import app from '../reducers';
import createSagaMiddleware from 'redux-saga';
import dataSaga from '../sagas';

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigationReducer'],
};
const persistedReducer = persistReducer(persistConfig, app);
const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(logger, sagaMiddleware),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(dataSaga);
  return { store, persistor };
};
