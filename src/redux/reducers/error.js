import { ERR_GETTING_BUCKET_CONTENTS } from '../actions/error';

export default function error(state = null, action) {
  switch (action.type) {
    case ERR_GETTING_BUCKET_CONTENTS:
      return action.message;
    default:
      return state;
  }
}
