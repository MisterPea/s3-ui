import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultipartUpload } from './MultipartUpload';
import { ListFiles, getBucketRegion } from './ListFiles';

/**
 * Drag and drop component
 * @param {string} label Label for area display
 * @return {JSX}
 */
export default function DragAndDrop({ label }) {
  const [onFileDrag, setOnFileDrag] = useState(false);
  const [viewContents, setViewContents] = useState(false);
  const [region, setRegion] = useState(null);
  const [activeUpload, setActiveUpload] = useState([]);
  const activeUploadRef = useRef();
  activeUploadRef.current = activeUpload;
  // The encapsulation of the state inside of a useRef instance
  // allows the persistance of state, which was getting
  // inadvertently reset when spreading the array whilst pushing to it.

  useEffect(() => {
    const location = getBucketRegion(label);
    location.then((res) => {
      setRegion(res ? res : undefined);
    });
  }, []);

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
    setActiveUpload(activeUploadRef.current.map((upload) => {
      return upload.title === data.title ? { ...upload, p: data.p } : upload;
    }));
  };

  const sendFile = (fileList, bucket) => {
    const classObject = {};
    for (let i = 0; i < fileList.length; i++) {
      classObject[`_${i}`] = new MultipartUpload(fileList[i], bucket);
      classObject[`_${i}`].getUploadId()
          .then(({ data }) => {
            setActiveUpload((cur) => [...cur, {
              title: fileList[i].name, p: 0,
            }]);
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
    sendFile(e.dataTransfer.files, label);
  };

  const handleViewContentsOpen = (e) => {
    e.preventDefault();
    setViewContents(true);
  };

  const handleViewContentsClose = (e) => {
    e.preventDefault();
    setViewContents(false);
  };


  return (
    <div>
      <div
        className='dropArea'
        style={onFileDrag ? { ...boxStyle, ...appendedStyle } : boxStyle}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleDropEvent(e)}
        onDragLeave={handleDragLeave}>
        {label}
        {activeUploadRef.current.map(({ title, p }, index) => (
          <p key={index}>{title}-{p}</p>
        ))}
      </div>
      <button onClick={handleViewContentsOpen}>
        View Contents
      </button>
      {viewContents && <ListFiles
        bucketName={label}
        region={region}
        callback={handleViewContentsClose
        } />}
    </div>
  );
};

DragAndDrop.propTypes = {
  label: PropTypes.string,
  sendFunction: PropTypes.func,
};
