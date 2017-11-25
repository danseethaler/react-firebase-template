import { combineReducers } from 'redux';

import user from './user';
import items from './items';

export default combineReducers({
  user,
  items,
});
