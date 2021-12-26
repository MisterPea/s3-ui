import axios from 'axios';
import { errorDeletingFile, errorUploadingFile, errorWithInitialUpload } from './error';
import MultipartUpload from '../../components/MultipartUpload';
import findFilenames from '../../components/helpers/findFileNames';
import { ensureUniqueFilename } from '../../components/helpers/validation';
import { uploadInit, uploadProgress, uploadEnd } from './uploadProgress';

export const ADD_FILE = 'ADD_FILE';
export const DELETE_FILE = 'DELETE_FILE';



function deleteFile(locale, bucket, key) {
  return {
    type: DELETE_FILE,
    locale,
    bucket,
    key,
  };
}

function addFile(bucket, filePath, fileName, size, lastModified) {
  return {
    type: ADD_FILE,
    bucket,
    filePath,
    fileName,
    size,
    lastModified,
  };
}

export function deleteFileFromList(region, bucket, key) {
  return (dispatch) => {
    axios({
      method: 'DELETE',
      url: `http://${HOSTNAME}/api/file`,
      data: JSON.stringify({ locale: region, bucket, key }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(deleteFile(region, bucket, key)))
      .catch(() => dispatch(errorDeletingFile()));
  };
}

export function uploadFiles(region, bucket, path = '', files) {
  const fileList = files;

  return (dispatch, getState) => {
    const uploadProgressCallback = ({ fileId, p }) => {
      dispatch(uploadProgress(fileId, p));
    };

    // This data is sent from MultipartUpload.js
    const uploadCompleteCallback = ({
      data, size, lastModified, filePath, fileName, fileId,
    }) => {
      if (data) {
        const { Bucket } = data;
        dispatch(addFile(Bucket, filePath, fileName, size, lastModified));
        dispatch(uploadEnd(fileId));
      }
    };

    const failCallback = (failedUploadId) => {
      dispatch(errorWithInitialUpload());
      dispatch(uploadEnd(failedUploadId));
    };

    const classObject = {};
    const activeFilenames = [];
    for (let i = 0; i < fileList.length; i += 1) {
      fileList[i].path = path;

      // Logic to check uniqueness of filename - change if duplicate
      const currentFilenames = findFilenames(getState(), bucket, path);
      const filename = ensureUniqueFilename(fileList[i].name, currentFilenames, activeFilenames);
      activeFilenames.push(filename);

      classObject[`_${i}`] = new MultipartUpload(fileList[i], bucket, region, filename);
      classObject[`_${i}`].getUploadId()
        .then(({ data }) => {
          dispatch(uploadInit(data));
          classObject[`_${i}`].uploadFile(
            data,
            uploadProgressCallback,
            uploadCompleteCallback,
            failCallback,
          );
        })
        .catch(() => {
          dispatch(errorUploadingFile());
        });
    }
  };
}
