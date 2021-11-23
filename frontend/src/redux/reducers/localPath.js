import { SET_PATH, CLEAR_PATH } from '../actions/localPath';

export default function localPath(state = [], action) {
  switch (action.type) {
    case SET_PATH:
      return state;
    case CLEAR_PATH:
      return state;
    default:
      return state;
  }
}
