import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { uploadFiles } from '../redux/actions/file';

export default function DragDrop({ bucket, locale, children }) {
  // current path and current element reference
  const prevTarget = useRef({ path: '', element: '', type: '' });
  const dispatch = useDispatch();

  function handleOnDragOver(e) {
    e.preventDefault();
    const currentDragSelect = e.target;
    const dataPath = currentDragSelect.dataset;
    const backgroundElement = currentDragSelect.parentElement;
    if (prevTarget.current.path !== dataPath.path) {
      prevTarget.current.path = dataPath.path;
      prevTarget.current.type = dataPath.type;
      handleAddFolderFileClass();
    }

    function handleAddFolderFileClass() {
      if (dataPath.type === 'folder') {
        backgroundElement.classList.add('drag-active');
        prevTarget.current.element = backgroundElement;
      } else {
        const allFiles = document.querySelectorAll("[data-type='file']");
        prevTarget.current.element = allFiles;
        for (let i = 0; i < allFiles.length; i += 1) {
          allFiles[i].parentElement.classList.add('drag-active');
        }
      }
    }
  }

  function handleDropEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(uploadFiles(locale, bucket, prevTarget.current.path, e.dataTransfer.files));
    handleDragLeave();
  }

  function handleDragLeave() {
    if (prevTarget.current.path !== '') {
      if (prevTarget.current.type === 'folder') {
        prevTarget.current.element.classList.remove('drag-active');
      } else {
        const fileElements = prevTarget.current.element;
        for (let i = 0; i < fileElements.length; i += 1) {
          fileElements[i].parentElement.classList.remove('drag-active');
        }
      }
      prevTarget.current = { path: '', element: '', type: '' };
    }
  }

  return (
    <div
      className="drag-element"
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => handleDropEvent(e)}
      onDragLeave={handleDragLeave}
    >
      {children}
    </div>
  );
}

DragDrop.propTypes = {
  bucket: propTypes.string.isRequired,
  locale: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};
