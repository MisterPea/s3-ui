import * as React from 'react';
import { IoCloudUploadOutline, IoTrashOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function FolderDropdown({
  isOpen, buttonClick, closeDropdown, toggleDeleteFolderModal, toggleUploadModal,
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
    toggleDeleteFolderModal();
    handleClose(true);
  }

  function handleUploadButton() {
    toggleUploadModal();
    handleClose(true);
  }

  return (
    <div className={`descend-menu ${isOpen ? 'visible-folder' : ''}`}>
      <div className="left-buttons">
        <button
          className="descend-menu-button"
          tabIndex={0}
          type="button"
          onClick={handleUploadButton}
        >
          <div className="content-wrapper">
            <div className="descend-menu-content">
              <IoCloudUploadOutline className="descend-menu-icon upload" />
              <p className="descend-menu-title">UPLOAD</p>
            </div>
          </div>
        </button>
      </div>
      <button
        className="descend-menu-button-delete"
        tabIndex={0}
        type="button"
        onClick={handleDeleteButton}
      >
        <div className="descend-menu-content">
          <IoTrashOutline className="descend-menu-icon-delete" />
        </div>
      </button>

    </div>
  );
}

FolderDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  buttonClick: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  toggleDeleteFolderModal: PropTypes.func.isRequired,
  toggleUploadModal: PropTypes.func.isRequired,
};
