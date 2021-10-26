import { ERR_GETTING_BUCKET_CONTENTS, ERR_DELETING_BUCKET } from '../actions/error';

export default function error(state = null, action) {
  switch (action.type) {
    case ERR_GETTING_BUCKET_CONTENTS:
    case ERR_DELETING_BUCKET:
      return action.message;
    default:
      return state;
  }
}
