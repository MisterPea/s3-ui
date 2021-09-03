import { combineReducers } from 'redux';
import buckets from './buckets';
import error from './error';
import loading from './loading';

export default combineReducers({
  loading,
  error,
  buckets,
});
