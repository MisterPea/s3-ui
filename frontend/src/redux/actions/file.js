import axios from 'axios';
import { errorDeletingFile } from './error';

export const ADD_FILE = 'ADD_FILE';
export const DELETE_FILE = 'DELETE_FILE';

const { hostname } = window.location;

function deleteFile(locale, bucket, key) {
  return {
    type: DELETE_FILE,
    locale,
    bucket,
    key,
  };
}

export function deleteFileFromList(region, bucket, key) {
  return (dispatch) => {
    axios({
      method: 'DELETE',
      url: `http://${hostname}/api/file`,
      data: JSON.stringify({ locale: region, bucket, key }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(deleteFile(region, bucket, key)))
      .catch(() => dispatch(errorDeletingFile()));
  };
}
