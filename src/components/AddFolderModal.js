import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { validateFolderName } from './helpers/validation';
import { addFolderToBucket } from '../redux/actions/folder';

/**
 * Content to be wrapped by ModalComponentWrapper - Initiates the creation of an empty folder
 * in the current directory.
 * @param {func<bool>} setModalOpen Passed in from `ModalComponentWrapper`- controls the
 * removal of the `ModalComponentWrapper` from the DOM.
 * @returns {JSX}
 */
export default function AddFolderModal({ setModalOpen }) {
  const [inputValue, setInputValue] = useState('');
  const [validEntry, setValidEntry] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('folder-text-input').focus();
  }, []);

  useEffect(() => {
    if (validateFolderName(inputValue)) {
      if (!validEntry) {
        setValidEntry(true);
      } else if (validEntry) setValidEntry(false);
    }
  }, [inputValue]);

  function handleInputChange(e) {
    const { value } = e.target;
    return setInputValue(value);
  }

  function handleAddFolder() {
    dispatch(addFolderToBucket())
  }

  return (
    <div className="modal-wrapper">
      <h1>Add Folder</h1>
      <input
        id="folder-text-input"
        type="text"
        placeholder="Enter new folder name"
        tabIndex={0}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
      />
      <ul className="folder-modal-instructions">
        <li>
          Folder name can be up to 1024 characters long.
        </li>
        <li>
          Name can be comprised of uppercase and lowercase characters,
          numbers, parenthesis /(/), underscores, hyphens, exclamation points,
          and single quotes.
        </li>
        <button
          tabIndex={0}
          type="button"
          disabled={!validEntry}
          onClick={handleAddFolder}
        >
          Create Folder
        </button>
      </ul>
    </div>
  );
}

AddFolderModal.defaultProps = {
  setModalOpen: null,
};

AddFolderModal.propTypes = {
  setModalOpen: PropTypes.func,
};
