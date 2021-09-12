import { LOADER_DISABLED, LOADER_ENABLED } from '../actions/loading';

export default function loading(state = true, action) {
  switch (action.type) {
    case LOADER_DISABLED:
      return false;
    case LOADER_ENABLED:
      return true;
    default:
      return state;
  }
}