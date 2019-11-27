import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import event from './event/reducer';

export default combineReducers({
  auth,
  user,
  event,
});
