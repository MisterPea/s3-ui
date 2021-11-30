import axios from 'axios';
import { errorDeletingFile } from './error';
import MultipartUpload from '../../components/MultipartUpload';
import findFilenames from '../../components/helpers/findFileNames';
import { ensureUniqueFilename } from '../../components/helpers/validation';

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
      url: `http://${hostname}/api/file`,
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

  // const [activeUpload, setActiveUpload] = useState([]);
  // const activeUploadRef = useRef();
  // activeUploadRef.current = activeUpload;

  return (dispatch, getState) => {
    const uploadProgressCallback = (data) => console.log(data);
    // const uploadCallback = (data) => {
    //   setActiveUpload(activeUploadRef.current.map((upload) => (
    //     upload.title === data.title ? { ...upload, p: data.p } : upload)));
    // };

    // This data is sent from MultipartUpload.js
    const uploadCompleteCallback = ({
      data, size, lastModified, filePath, fileName,
    }) => {
      if (data) {
        const { Bucket } = data;
        dispatch(addFile(Bucket, filePath, fileName, size, lastModified));
      }
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
          // setActiveUpload((cur) => [...cur, {
          //   title: fileList[i].name, p: 0,
          // }]);
          classObject[`_${i}`].uploadFile(
            data,
            uploadProgressCallback,
            uploadCompleteCallback,
          );
        })
        .catch((err) => {
          console.error(`Upload failure: Can't retrieve UploadId: ${err}`);
        });
    }
  };
}
