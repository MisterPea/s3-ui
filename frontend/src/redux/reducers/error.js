import {
  ERR_GETTING_BUCKET_CONTENTS,
  ERR_GETTING_BUCKETS,
  ERR_DELETING_BUCKET,
  ERR_CREATING_BUCKET,
  ERR_CREATING_FOLDER,
  ERR_DELETING_FOLDER,
  ERR_DOWNLOADING_FILE,
  ERR_DELETING_FILE,
  ERR_UPLOADING_FILE,
  ERR_INITIAL_UPLOAD,
  RESET_ERROR,
} from '../actions/error';

export default function error(state = null, action) {
  switch (action.type) {
    case ERR_GETTING_BUCKET_CONTENTS:
    case ERR_DELETING_BUCKET:
    case ERR_GETTING_BUCKETS:
    case ERR_CREATING_BUCKET:
    case ERR_CREATING_FOLDER:
    case ERR_DELETING_FILE:
    case ERR_DELETING_FOLDER:
    case ERR_DOWNLOADING_FILE:
    case ERR_UPLOADING_FILE:
    case ERR_INITIAL_UPLOAD:
      return action.message;
    case RESET_ERROR:
      return action.message;
    default:
      return state;
  }
}
