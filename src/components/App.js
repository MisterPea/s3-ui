import React from 'react';
import DragAndDrop from './DragAndDrop';
import {MultipartUpload} from './MultipartUpload';

/**
 * Application entrypoint
 * @return {JSX}
 */
export default function App() {
  const sendImage = (e) => {
    e.preventDefault();
    const image = document.querySelector('#file-upload').files[0];
    const upload = new MultipartUpload(image, 'another-one');
    upload.getUploadId()
        .then(({data}) => {
          console.log(data);
          upload.uploadFile(data);
        })
        .catch((err)=> {
          console.error(`Upload failure: Can't reteive UploadId: ${err}`);
        });
  };

  return (<div>
    <h2>S3 Upload</h2>
    <hr />
    <form>
      <input
        type="file"
        accept="image/*"
        id="file-upload"
        multiple
      />
      <button onClick={(e) => sendImage(e)}>Submit</button>
    </form>
    <DragAndDrop />
  </div>);
};

