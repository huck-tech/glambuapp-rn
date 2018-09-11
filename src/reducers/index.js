import { combineReducers } from 'redux';

import navigationReducer from './navigationReducer';
import user from './user';

const AppReducer = combineReducers({
  navigationReducer,
  user,
});

export default AppReducer;
