import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import pollReducer from './poll/pollReducer';

const rootReducer = combineReducers({
  authReducer,
  pollReducer
});
export default rootReducer;
