import * as React from 'react';
import { useEffect } from 'react';
import { IoCloudUploadSharp, IoTrashSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function FolderTooltip({
  buttonClick, closeTooltip, toggleDeleteModal, toggleUploadModal,
}) {
  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  function handleClose(isButtonClick = false) {
    if (isButtonClick) {
      buttonClick();
    } else {
      closeTooltip();
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
    <div className="folder-tooltip-menu">
      <div className="tooltip-button-group">
        <button
          className="option-button"
          tabIndex={0}
          type="button"
          onClick={handleDeleteButton}
        >
          <div
            className="option-content"
          >
            <IoTrashSharp className="folder-option-icon delete" />
            <p className="option-title">Delete Folder</p>
          </div>
        </button>
        <button
          className="option-button"
          tabIndex={0}
          type="button"
          onClick={handleUploadButton}
        >
          <div
            className="option-content"
          >
            <IoCloudUploadSharp className="folder-option-icon upload" />
            <p className="option-title">Upload To Folder</p>
          </div>
        </button>
      </div>
    </div>
  );
}

FolderTooltip.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  closeTooltip: PropTypes.func.isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
  toggleUploadModal: PropTypes.func.isRequired,
};
