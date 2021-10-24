import * as React from 'react';
import { IoCloudDownloadOutline, IoTrashOutline } from 'react-icons/io5';
import propTypes from 'prop-types';
import fileSizeTruncate from './helpers/fileSizeTruncate';

export default function FileModal({ fileInfo, setModalOpen }) {
  const { name, lastModified, size } = fileInfo;

  function handleDownloadClick() {
    setModalOpen();
  }

  function handleDeleteClick() {
    setModalOpen();
  }

  return (
    <>
      <div>
        <h3>File Info:</h3>
        <p>{`Name: ${name}`}</p>
        <p>{`Size: ${fileSizeTruncate(size)}`}</p>
        <p>{`Last Modified: ${lastModified}`}</p>
      </div>
      <div className="file-button-wrapper">
        <button
          type="button"
          onClick={handleDownloadClick}
        >
          <div className="file-icon"><IoCloudDownloadOutline /></div>
          <p>Download File</p>
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
        >
          <div className="file-icon"><IoTrashOutline /></div>
          <p>Delete File</p>
        </button>
      </div>
    </>
  );
}

FileModal.propTypes = {
  fileInfo: propTypes.shape({
    name: propTypes.string,
    size: propTypes.number,
    lastModified: propTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  setModalOpen: propTypes.func,
};
