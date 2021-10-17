import * as React from 'react';
import { useEffect, useRef } from 'react';
import { IoCloudUploadSharp, IoTrashSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function FolderDropdown({
  isOpen, buttonClick, closeDropdown, toggleDeleteModal, toggleUploadModal,
}) {

  if (isOpen) {
    document.addEventListener('click', handleClose);
  }

  function handleClose(isButtonClick = false) {
    document.removeEventListener('click', handleClose);
    if (isButtonClick) {
      buttonClick();
    } else {
      closeDropdown();
    }
  }

  function handleDeleteButton() {
    toggleDeleteModal();
    handleClose(true);
  }

  function handleUploadButton() {
    toggleUploadModal();
    handleClose(true);
  }

  return (
    <div className={`descend-menu ${isOpen ? 'visible-folder' : ''}`}>
      <button
        className="descend-menu-button"
        tabIndex={0}
        type="button"
        onClick={handleDeleteButton}
      >
        <div
          className="descend-menu-content"
        >
          <IoTrashSharp className="descend-menu-icon delete" />
          <p className="descend-menu-title">Delete Folder</p>
        </div>
      </button>
      <button
        className="descend-menu-button"
        tabIndex={0}
        type="button"
        onClick={handleUploadButton}
      >
        <div
          className="descend-menu-content"
        >
          <IoCloudUploadSharp className="descend-menu-icon upload" />
          <p className="descend-menu-title">Upload To Folder</p>
        </div>
      </button>
    </div>
  );
}

FolderDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  buttonClick: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
  toggleUploadModal: PropTypes.func.isRequired,
};
