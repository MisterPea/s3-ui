import axios from 'axios';
import { errorCreatingFolder, errorDeletingFolder } from './error';

export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';



function addFolder(locale, folderPath, bucket, folderName) {
  return {
    type: ADD_FOLDER,
    locale,
    folderPath,
    bucket,
    folderName,
  };
}

function deleteFolder(bucket, pathToDelete) {
  return {
    type: DELETE_FOLDER,
    bucket,
    pathToDelete,
  };
}

export function addFolderToBucket(locale, folderPath, bucket, folderName) {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${HOSTNAME}/api/createFolder`,
      data: JSON.stringify({
        locale, folderPath, bucket, folderName,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(addFolder(locale, folderPath, bucket, folderName)))
      .catch(() => dispatch(errorCreatingFolder()));
  };
}

export function deleteFolderFromBucket(locale, bucket, pathToDelete, folderName) {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${HOSTNAME}/api/deleteFolder`,
      data: JSON.stringify({
        locale, bucket, pathToDelete, folderName,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(deleteFolder(bucket, pathToDelete)))
      .catch(() => dispatch(errorDeletingFolder()));
  };
}
