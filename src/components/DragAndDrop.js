import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {MultipartUpload} from './MultipartUpload';

/**
 * Drag and drop component
 * @param {string} label Label for area display
 * @return {JSX}
 */
export default function DragAndDrop({ label }) {
  const [onFileDrag, setOnFileDrag] = useState(false);
  const [activeUpload, setActiveUpload] = useState([]);

  const boxStyle = {
    marginTop: '20px',
    // height: '200px',
    width: '500px',
    backgroundColor: '#E6E6E6',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontSize: '12px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
  };

  const appendedStyle = {
    backgroundColor: 'blue',
  };

  const callback = (data) => {
    console.log(data)
    // setActiveUpload((oldArray) => [...oldArray, {title: data.title, p: data.p}]);
  }

  console.log(activeUpload);

  const sendImage = (fileList, bucket) => {
    const classObject = {};
    for (let i=0; i < fileList.length; i++) {
      classObject[`_${i}`] = new MultipartUpload(fileList[i], bucket);
      classObject[`_${i}`].getUploadId()
          .then(({ data }) => {
            classObject[`_${i}`].uploadFile(data, callback);
          })
          .catch((err) => {
            console.error(`Upload failure: Can't retrieve UploadId: ${err}`);
          });
    };
  };

  // Drag logic
  const handleOnDragEnter = (e) => {
    const isFile = e.dataTransfer.types.includes('Files');
    if (isFile) {
      e.preventDefault();
      setOnFileDrag(true);
    }
  };

  const handleDragLeave = (e) => {
    setOnFileDrag(false);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    setOnFileDrag(false);
    sendImage(e.dataTransfer.files, label);
  };


  return (
    <div
      className='dropArea'
      style={onFileDrag ? {...boxStyle, ...appendedStyle}: boxStyle}
      onDragEnter={(e) => handleOnDragEnter(e)}
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => handleDropEvent(e)}
      onDragLeave={handleDragLeave}>
      {label}

    </div>
  );
};

DragAndDrop.propTypes = {
  label: PropTypes.string,
  sendFunction: PropTypes.func,
}