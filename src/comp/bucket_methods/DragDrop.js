import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {MultipartUpload} from './MultipartUpload';

/**
 * Drag and drop component
 * @param {object} children component children
 * @param {String} bucket Name of S3 bucket
 * @param {String?} path Optional path property, for nested links
 * @return {object}
 */
export default function DragDrop({ children, bucket, path = '', setState}) {
  const prevTarget = useRef('');
  const [activeUpload, setActiveUpload] = useState([]);
  const activeUploadRef = useRef();
  activeUploadRef.current = activeUpload;
  // The encapsulation of the state inside of a useRef instance
  // allows the persistance of state, which was getting
  // inadvertently reset when spreading the array whilst pushing to it.

  const uploadCallback = (data) => {
    setActiveUpload(activeUploadRef.current.map((upload) => {
      return upload.title === data.title ? { ...upload, p: data.p } : upload;
    }));
  };

  const serverCallback = (data) => {
    if (data.status === 200) {
      setState(bucket);
    }
  };

  activeUpload.forEach((a) => {
    console.log(a);
  });

  /**
   * The sendFile method takes in a list of files for upload. It parses out
   * each file and assigns it to a `MultipartUpload` object, which facilitates
   * progress tracking as each file is given it's own percentage completion.
   * Each object created is stored in the `classObject` object.
   * @param {File[]} fileList Array of files send from `onDrop` handler
   * @param {String} region Region the S3 bucket resides
   */
  const sendFile = (fileList, region) => {
    const classObject = {};
    for (let i = 0; i < fileList.length; i++) {
      fileList[i].path = path;
      console.log(path);
      classObject[`_${i}`] = new MultipartUpload(fileList[i], bucket, region);
      classObject[`_${i}`].getUploadId()
          .then(({ data }) => {
            setActiveUpload((cur) => [...cur, {
              title: fileList[i].name, p: 0,
            }]);
            classObject[`_${i}`].uploadFile(
                data,
                uploadCallback,
                serverCallback,
            );
          })
          .catch((err) => {
            console.error(`Upload failure: Can't retrieve UploadId: ${err}`);
          });
    };
  };

  const handleDragLeave = () => {
    if (prevTarget.current !== '') {
      const elem = document.getElementsByClassName(prevTarget.current);
      for (const dragElement of elem) {
        dragElement.classList.remove('drag-active');
      }
      prevTarget.current = '';
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    const targets = ['DIV', 'LI', 'UL'];
    if (targets.includes(e.target.nodeName)) {
      const draggedTo = e.target.className.split(/(jsx-li)|(bucket-li)/);
      const newDrag = draggedTo[draggedTo.length - 1];
      if (newDrag !== prevTarget.current &&
        newDrag !== prevTarget.current + ' drag-active') {
        const isFile = e.dataTransfer.types.includes('Files');
        if (isFile && newDrag !== 'bucket-label-and-dropdown') {
          e.stopPropagation();
          prevTarget.current = newDrag;
          const elements = document.getElementsByClassName(newDrag);
          for (const element of elements) {
            element.classList.add('drag-active');
          }
        }
      }
    }
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const elem = document.getElementsByClassName(prevTarget.current);
    const region = elem[0].dataset.region;
    sendFile(e.dataTransfer.files, region);
    handleDragLeave();
  };

  return (
    <div
      className='drag-element'
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => handleDropEvent(e)}
      onDragLeave={handleDragLeave}>
      {children}
    </div>);
}

DragDrop.propTypes = {
  children: PropTypes.object,
  bucket: PropTypes.string,
  path: PropTypes.string,
  setState: PropTypes.func,
};
