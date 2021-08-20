import { combineReducers } from 'redux';
import buckets from './buckets';
import error from './error';

export default combineReducers({
  error,
  buckets,
});
