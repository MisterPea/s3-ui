import * as React from 'react';
import { useState } from 'react';
import { IoCloudDownloadOutline, IoInformationCircleSharp } from 'react-icons/io5';
import { FiTrash } from 'react-icons/fi';
import { FaExclamationTriangle } from 'react-icons/fa';
import propTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import fileSizeTruncate from './helpers/fileSizeTruncate';
import { deleteFileFromList } from '../redux/actions/file';
import { errorDownloadingFile } from '../redux/actions/error';
import SubmitBtnWithIcon from './SubmitBtnWithIcon';
import SubmitButton from './SubmitButton';

export default function FileModal({
  fileInfo, setModalOpen, downloadInfo, modalId,
}) {
  const { name, lastModified, size } = fileInfo;
  
  const { locale, bucket, filePath } = downloadInfo;
  const key = `${(filePath && filePath.slice(1)) || ''}/${name}`;
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  function handleDownloadClick() {
    setModalOpen();
    axios({
      method: 'GET',
      url: `${SSL}${HOSTNAME}/api/downloadFile`,
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
      link.remove();
    })
      .catch(() => dispatch(errorDownloadingFile()));
  }

  function toggleDeleteConfirmClick() {
    setShowDeleteConfirm((s) => !s);
  }

  function handleDeleteConfirm() {
    document.getElementById(modalId).remove();
    dispatch(deleteFileFromList(locale, bucket, key));
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
          <hr className="modal-delete-rule" />
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
            <SubmitButton
              text="DELETE FILE"
              clickHandle={handleDeleteConfirm}
              isDisabled={!showDeleteConfirm}
              destructive
              exactWidth="250px"
              exactHeight="50px"
            />
            <SubmitButton
              text="CANCEL"
              clickHandle={toggleDeleteConfirmClick}
              isDisabled={!showDeleteConfirm}
              exactWidth="250px"
              exactHeight="50px"
            />
          </div>
        </div>
      </div>
      <div className="modal-wrapper">
        <div className="modal-button-group file">
          <header className="modal-header file">
            <IoInformationCircleSharp />
          </header>
          <div className="file-info-body" aria-label="File Info Title">
            <h3>FILE INFO:</h3>
            <div className="file-info">
              <h4>NAME:</h4>
              <p aria-label="Filename">{` ${name}`}</p>
            </div>
            <div className="file-info">
              <h4 aria-label="File Size">SIZE:</h4>
              <p>{` ${fileSizeTruncate(size)}`}</p>
            </div>
            <div className="file-info">
              <h4>LAST MODIFIED:</h4>
              <p aria-label="Last Modified">{` ${toDate()}`}</p>
            </div>
          </div>
        </div>
        <div className="file-button-wrapper">
          <SubmitBtnWithIcon
            text="DOWNLOAD FILE"
            isDisabled={showDeleteConfirm}
            Icon={IoCloudDownloadOutline}
            clickHandle={handleDownloadClick}
          />
          <SubmitBtnWithIcon
            text="DELETE FILE"
            Icon={FiTrash}
            isDisabled={showDeleteConfirm}
            clickHandle={toggleDeleteConfirmClick}
            destructive
          />
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
  modalId: undefined,
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
  modalId: propTypes.string,
};
