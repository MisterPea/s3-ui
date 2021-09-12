import axios from 'axios';
import { errorCreatingFolder } from './error';

export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';

const { hostname } = window.location;

function addFolder(locale, folderPath, bucket) {
  return {
    type: ADD_FOLDER,
    folder: {
      locale,
      folderPath,
      bucket,
    },
  };
}

export function addFolderToBucket(locale, folderPath, bucket) {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `http://${hosrtname}:3200/addFolder`,
      data: JSON.stringify({ locale, folderPath, bucket }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(addFolder(locale, folderPath, bucket))).dispatch(errorCreatingFolder());
  };
}
