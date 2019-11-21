import { combineReducers } from 'redux';

import generateReducer from './generate';

export default combineReducers({
  generate: generateReducer
});
