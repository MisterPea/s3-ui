import { combineReducers } from 'redux';
import buckets from './buckets';
import error from './error';
import loading from './loading';
import uploadProgress from './uploadProgress';

export default combineReducers({
  loading,
  error,
  buckets,
  uploadProgress,
});
