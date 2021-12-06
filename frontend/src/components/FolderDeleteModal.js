import * as React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IoTrashSharp } from 'react-icons/io5';
import { deleteFolderFromBucket } from '../redux/actions/folder';
import ModalHeader from './ModalHeader';
import SubmitButton from './SubmitButton';

export default function FolderDeleteModal({
  setModalOpen, locale, bucket, pathToDelete, folderName,
}) {
  const [confirmInput, setConfirmInput] = useState('');
  const [validInput, setValidInput] = useState(false);
  const dispatch = useDispatch();

  function handleInputChange(e) {
    setConfirmInput(e.target.value);
  }

  function handleDeleteFolder() {
    dispatch(deleteFolderFromBucket(locale, bucket, pathToDelete, folderName));
    setModalOpen();
  }

  const lastPath = () => {
    const endPath = pathToDelete.split('/').filter(Boolean);
    return endPath[endPath.length - 1];
  };

  if (confirmInput === lastPath()) {
    if (!validInput) {
      setValidInput(true);
    }
  } else if (validInput) {
    setValidInput(false);
  }

  return (
    <div className="modal-wrapper">
      <ModalHeader text="Delete Folder" Icon={IoTrashSharp} iconColor="red" rule />
      <div className="modal-button-group">
        <div className="warning-red">
          <div className="warning-body-wrapper">
            <div className="warning-body">
              THIS WILL DELETE THE FOLDER
              <span className="folder-path-warning">{` ${lastPath()} `}</span>
              AND ITS CONTENTS. THIS IS AN IRREVERSIBLE ACTION!
            </div>
          </div>
        </div>
      </div>
      <hr className="modal-rule" />
      <p className="confirm-message">
        To confirm deletion, type
        <span className="confirm-folder">{` ${lastPath()} `}</span>
        in the text input field.
      </p>
      <input
        className="confirm-input"
        placeholder={lastPath()}
        type="text"
        onChange={(e) => handleInputChange(e)}
        value={confirmInput}
      />
      <SubmitButton
        text="Delete Folder"
        clickHandle={handleDeleteFolder}
        isDisabled={!validInput}
        destructive
      />
      {/* <button
        tabIndex={0}
        className="delete-submit"
        type="button"
        disabled={!validInput}
        onClick={handleDeleteFolder}
      >
        Delete Folder
      </button> */}
    </div>
  );
}

FolderDeleteModal.defaultProps = {
  setModalOpen: null,
};

FolderDeleteModal.propTypes = {
  setModalOpen: propTypes.func,
  locale: propTypes.string.isRequired,
  bucket: propTypes.string.isRequired,
  pathToDelete: propTypes.string.isRequired,
  folderName: propTypes.string.isRequired,
};
