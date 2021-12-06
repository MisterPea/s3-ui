import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { IoFolderOutline } from 'react-icons/io5';
import { validateFolderName } from './helpers/validation';
import { addFolderToBucket } from '../redux/actions/folder';
import useParseQuery from './helpers/useParseQuery';
import SubmitButton from './SubmitButton';
import ModalHeader from './ModalHeader';

/**
 * Content to be wrapped by ModalComponentWrapper - Initiates the creation of an empty folder
 * in the current directory.
 * @param {function} setModalOpen Passed in from `ModalComponentWrapper`- controls the
 * removal of the `ModalComponentWrapper` from the DOM. A bool is passed as an arg.
 * `true` to open, `false` to close.
 * @param {function} folders Passed in from FileDisplay, `folders()` should return an array
 * of the current folders in the specific bucket context.
 * @returns {JSX}
 */
export default function AddFolderModal({ setModalOpen, folders }) {
  const [inputValue, setInputValue] = useState('');
  const [validEntry, setValidEntry] = useState(false);
  const dispatch = useDispatch();
  const { id: bucket, loc: locale, path: folderPath = '/' } = useParseQuery();

  const handleEnterClick = useCallback((e) => {
    if (e.key === 'Enter' && validEntry) {
      handleAddFolder();
    }
  }, [validEntry, inputValue]);

  useEffect(() => {
    document.getElementById('folder-text-input').focus();
    document.addEventListener('keydown', handleEnterClick);
    return () => {
      document.removeEventListener('keydown', handleEnterClick);
    };
  }, [validEntry, inputValue]);

  useEffect(() => {
    if (validateFolderName(inputValue, folders()) === true) {
      if (validEntry === false) {
        setValidEntry(true);
      }
    } else if (validEntry) setValidEntry(false);
  }, [inputValue]);

  function handleInputChange(e) {
    const { value } = e.target;
    return setInputValue(value);
  }

  function handleAddFolder() {
    dispatch(addFolderToBucket(locale, folderPath, bucket, inputValue));
    setModalOpen();
  }

  return (
    <div className="modal-wrapper">
      <ModalHeader text="Add Folder" Icon={IoFolderOutline} />
      <input
        id="folder-text-input"
        type="text"
        placeholder="Enter new folder name"
        tabIndex={0}
        value={inputValue}
        autoComplete="off"
        onChange={(e) => handleInputChange(e)}
      />
      <ul className="modal-instructions">
        <li>Folder name can be up to 1024 characters long.</li>
        <li>
          Name can be comprised of uppercase and lowercase characters,
          numbers, parenthesis, underscores, hyphens, exclamation points,
          and single quotes.
        </li>
      </ul>
      <SubmitButton text="Create Folder" isDisabled={!validEntry} clickHandle={handleAddFolder} />
    </div>
  );
}

AddFolderModal.defaultProps = {
  setModalOpen: null,
};

AddFolderModal.propTypes = {
  setModalOpen: PropTypes.func,
  folders: PropTypes.func.isRequired,
};
