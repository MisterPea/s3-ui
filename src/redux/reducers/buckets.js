import {
  GET_BUCKETS,
  CREATE_BUCKET,
  DELETE_BUCKET,
  GET_BUCKET_CONTENTS,
  GET_BUCKETS_AND_CONTENTS,
} from '../actions/bucket';

/**
 * Pure function to handle bucket actions
 * @param {Object} state Redux state
 * @param {func} action Action to be executed
 * @return {Object} state
 */
export default function buckets(state = [], action) {
  switch (action.type) {
    case GET_BUCKETS:
      return action.buckets;
    case GET_BUCKET_CONTENTS:
      return state.map((bucket) => (
        bucket.Name === action.bucket
          ? ({ ...bucket, contents: action.contents.data })
          : bucket
      ));
    case GET_BUCKETS_AND_CONTENTS:
      return action.buckets;
    case CREATE_BUCKET:
      return {};
    case DELETE_BUCKET:
      return {};
    default:
      return state;
  }
}
