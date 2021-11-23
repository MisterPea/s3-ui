import { combineReducers } from 'redux';
import buckets from './buckets';
import error from './error';
import loading from './loading';
import localPath from './localPath';

export default combineReducers({
  loading,
  error,
  buckets,
  localPath,
});
