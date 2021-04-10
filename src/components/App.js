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
    const classObject = {};
    const images = document.querySelector('#file-upload').files;
    for (let i=0; i < images.length; i++) {
      console.log(images[i])
      classObject[`iter${i}`] = new MultipartUpload(images[i], 'another-one');
      classObject[`iter${i}`].getUploadId()
          .then(({ data }) => {
            console.log(data);
            classObject[`iter${i}`].uploadFile(data);
          })
          .catch((err) => {
            console.error(`Upload failure: Can't reteive UploadId: ${err}`);
          });
    };
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

