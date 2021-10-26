import * as React from 'react';
import { IoCloudDownloadOutline, IoTrashOutline, IoInformationCircleSharp } from 'react-icons/io5';
import propTypes from 'prop-types';
import axios from 'axios';
import fileSizeTruncate from './helpers/fileSizeTruncate';

export default function FileModal({ fileInfo, setModalOpen, downloadInfo }) {
  const { name, lastModified, size } = fileInfo;
  const { hostname } = window.location;

  function handleDownloadClick() {
    const { locale, bucket, filePath } = downloadInfo;
    const key = `${(filePath && filePath.slice(1)) || ''}/${name}`;
    axios({
      method: 'POST',
      url: `http://${hostname}:3200/downloadFile`,
      data: { locale, bucket, key },
      headers: {
        'content-type': 'application/json',
      },
    }).then((url) => {
      const link = document.createElement('A');
      link.setAttribute('download', name);
      link.href = url.data;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
    setModalOpen();
  }

  function handleDeleteClick() {
    setModalOpen();
  }

  function toDate() {
    return lastModified.split('T')[0];
  }

  return (
    <>
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
            onClick={handleDeleteClick}
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
