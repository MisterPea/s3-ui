import * as React from 'react';
import { useState } from 'react';
import { IoCloudDownloadOutline, IoTrashOutline, IoInformationCircleSharp } from 'react-icons/io5';
import { FaExclamationTriangle } from 'react-icons/fa';
import propTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import fileSizeTruncate from './helpers/fileSizeTruncate';
import { deleteFileFromList } from '../redux/actions/file';
import { errorDownloadingFile } from '../redux/actions/error';

export default function FileModal({ fileInfo, setModalOpen, downloadInfo }) {
  const { name, lastModified, size } = fileInfo;
  const { hostname } = window.location;
  const { locale, bucket, filePath } = downloadInfo;
  const key = `${(filePath && filePath.slice(1)) || ''}/${name}`;
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleDownloadClick() {
    setModalOpen();
    axios({
      method: 'GET',
      url: `http://${hostname}/api/downloadFile`,
      params: { locale, bucket, key },
      headers: {
        'content-type': 'application/json',
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    })
      .catch(() => dispatch(errorDownloadingFile()));
  }

  function toggleDeleteConfirmClick() {
    setShowDeleteConfirm((s) => !s);
  }

  function handleDeleteConfirm() {
    dispatch(deleteFileFromList(locale, bucket, key));
    setModalOpen();
  }

  function toDate() {
    return lastModified.split('T')[0];
  }

  return (
    <>
      <div className={`delete-confirmation${showDeleteConfirm ? ' visible' : ''}`}>
        <header className="confirm-delete-header">
          <FaExclamationTriangle />
          <h3>Are you sure?</h3>
          <p>
            Deleting
            {' '}
            <span>{name}</span>
            {' '}
            cannot be undone.
          </p>
        </header>
        <div className="delete-modal-lower">
          <div className="delete-button-wrapper">
            <button
              type="button"
              onClick={handleDeleteConfirm}
            >
              <div className="button-content-wrapper ">
                <h2 className="delete">DELETE FILE</h2>
              </div>
            </button>
            <button
              type="button"
              onClick={toggleDeleteConfirmClick}
            >
              <div className="button-content-wrapper">
                <h2 className="cancel">CANCEL</h2>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="modal-wrapper">
        <div className="modal-button-group">
          <header className="modal-header">
            <IoInformationCircleSharp />
            <h3>FILE INFO:</h3>
          </header>
          <div className="file-info-body">
            <div className="file-info">
              <h4>NAME:</h4>
              <p>{` ${name}`}</p>
            </div>
            <div className="file-info">
              <h4>SIZE:</h4>
              <p>{` ${fileSizeTruncate(size)}`}</p>
            </div>
            <div className="file-info">
              <h4>LAST MODIFIED:</h4>
              <p>{` ${toDate()}`}</p>
            </div>
          </div>
        </div>
        <div className="file-button-wrapper">
          <button
            type="button"
            onClick={handleDownloadClick}
          >
            <div className="button-content-wrapper">
              <div className="file-icon"><IoCloudDownloadOutline /></div>
              <h2>DOWNLOAD FILE</h2>
            </div>
          </button>
          <button
            type="button"
            onClick={toggleDeleteConfirmClick}
          >
            <div className="button-content-wrapper">
              <div className="file-icon delete"><IoTrashOutline /></div>
              <h2>DELETE FILE</h2>
            </div>
          </button>
        </div>
      </div>

    </>
  );
}
FileModal.defaultProps = {
  downloadInfo: {
    locale: 'us-east-1',
    bucket: '',
    filePath: null,
  },
};

FileModal.propTypes = {
  fileInfo: propTypes.shape({
    name: propTypes.string,
    size: propTypes.number,
    lastModified: propTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  setModalOpen: propTypes.func,
  downloadInfo: propTypes.shape({
    locale: propTypes.string,
    bucket: propTypes.string,
    filePath: propTypes.string,
  }),
};
