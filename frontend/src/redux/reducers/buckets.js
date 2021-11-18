import { addFile, addFolder, deleteObject } from './helperFunctions';
import {
  GET_BUCKETS,
  CREATE_BUCKET,
  DELETE_BUCKET,
  GET_BUCKET_CONTENTS,
  GET_BUCKETS_AND_CONTENTS,
} from '../actions/bucket';

import { ADD_FILE, DELETE_FILE } from '../actions/file';

import {
  ADD_FOLDER,
  DELETE_FOLDER,
} from '../actions/folder';

/**
 * Pure function to handle bucket actions
 * @param {Object} state Redux state
 * @param {function} action Action to be executed
 * @return {Object} state
 */
export default function buckets(state = [], action) {
  switch (action.type) {
    case GET_BUCKETS:
      return action.buckets;
    case GET_BUCKET_CONTENTS:
      return state.map((bucket) => (
        bucket.Name === action.bucket
          ? ({ ...bucket, contents: action.contents })
          : bucket
      ));
    case GET_BUCKETS_AND_CONTENTS:
      return action.buckets;
    case CREATE_BUCKET:
      return state.concat([action.bucket]).sort((a, b) => a.Name.localeCompare(b.Name));
    case DELETE_BUCKET:
      return state.filter((bucket) => (
        (bucket.Name !== action.bucket && bucket.Region !== action.locale)));
    case ADD_FOLDER:
      return addFolder(action.folderPath, action.folderName, action.bucket, state);
    case DELETE_FOLDER:
      return deleteObject('folder', action.bucket, action.pathToDelete, state);
    case ADD_FILE:
      return addFile(action.bucket,
        action.filePath, action.fileName, action.size, action.lastModified, state);
    case DELETE_FILE:
      return deleteObject('file', action.bucket, action.key, state);
    default:
      return state;
  }
}
