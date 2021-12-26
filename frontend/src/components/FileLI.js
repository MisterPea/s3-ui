import * as React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import {
  IoCloudUploadOutline, IoEllipsisVerticalCircle, IoInformationCircleSharp, IoCloudDownloadOutline,
} from 'react-icons/io5';
import { FiTrash } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Folder } from './graphic_elements/Icons';
import FileIcon from './helpers/FileIcon';
import FolderDropdown from './FolderDropdown';
import FolderDeleteModal from './FolderDeleteModal';
import ModalComponentWrapper from './ModalComponentWrapper';
import FileModal from './FileModal';
import fileSizeTruncate from './helpers/fileSizeTruncate';
import { errorDownloadingFile } from '../redux/actions/error';
import utcFormat from './helpers/utcFormat';
import DeleteFileModal from './DeleteFileModal';

/**
 * Component to render a folder or a file
 * @prop {string} type The type to be rendered `file` or `folder`
 * @prop {string} name Name associated with the file or folder
 * @prop {string} lastModified Date object was last modified (Only for files)
 * @prop {number} size Size of the file (Only for files)
 * @prop {string} filePath File path leading to children (Only for folders)
 * @prop {func?} folderClick Callback for folders that are clicked
 * @prop {string} locale Region of the bucker - passed to modal.
 * @prop {func?} uploadClick Click handler to be called on uploads emanating from folders
 * @return {JSX}
 */
export default function FileLI({
  bucket,
  type,
  name,
  lastModified = null,
  size = null,
  filePath = null,
  folderClick,
  locale,
  uploadClick = null,
}) {
  // For Both
  const dispatch = useDispatch();
  const [toggleTooltip, setToggleTooltip] = useState(false);
  const [toggleDeleteFileModal, setToggleDeleteFileModal] = useState(false);
  // For Folders
  const [toggleDeleteFolderModal, setToggleDeleteFolderModal] = useState(false);
  function onKeyDownFolder(e) {
    e.preventDefault();
    if (e.key === 'Enter') folderClick(filePath);
  }

  // For Files
  const [toggleFileModal, setToggleFileModal] = useState(false);
  
  const key = `${(filePath && filePath.slice(1)) || ''}/${name}`;

  function onKeyDownFile(e) {
    e.preventDefault();
    if (e.key === 'Enter') handleToggleTooltip();
  }

  function handleDownloadClick() {
    axios({
      method: 'GET',
      url: `http://${HOSTNAME}/api/downloadFile`,
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

  // *********** Folder *********** //
  function handleToggleTooltip() {
    setToggleTooltip((s) => !s);
  }

  function handleToggleDeleteModal() {
    setToggleDeleteFileModal((s) => !s);
  }

  function handleCloseTooltip() {
    setToggleTooltip(false);
  }

  function handleDeleteModal() {
    setToggleDeleteFolderModal((s) => !s);
  }

  if (type === 'folder') {
    return (
      <motion.li
        layout
        className="file-folder-li"
      >
        <div className="file-row-wrapper">
          <div className="file-row folder">
            <div
              aria-label={`Folder for ${name}`}
              className="file-row-left"
              role="button"
              tabIndex={0}
              onClick={() => folderClick(filePath)}
              onKeyDown={(e) => onKeyDownFolder(e)}
              data-path={filePath}
              data-type="folder"
            >
              <div className="icon-wrapper"><Folder /></div>
              <p className="file-table-data">{name}</p>
            </div>
            <div className="file-row-right folder">
              <IoEllipsisVerticalCircle
                className="phone"
                onClick={handleToggleTooltip}
              />
              <IoCloudUploadOutline
                className="folder tablet upload"
                title={`Upload to ${name}`}
                onClick={() => uploadClick(filePath)}
              />
              <FiTrash
                className="folder tablet delete"
                title={`Delete ${name}`}
                onClick={handleDeleteModal}
              />
            </div>
          </div>
          <FolderDropdown
            isOpen={toggleTooltip}
            toggleDeleteFolderModal={handleDeleteModal}
            closeDropdown={handleToggleTooltip}
            buttonClick={handleCloseTooltip}
            uploadClick={() => uploadClick(filePath)}
            name={name}
          />
          { toggleDeleteFolderModal
    && (
    <ModalComponentWrapper close={handleDeleteModal}>
      <FolderDeleteModal
        locale={locale}
        bucket={bucket}
        pathToDelete={filePath}
        folderName={name}
      />
    </ModalComponentWrapper>
    ) }
        </div>
      </motion.li>
    );
  }

  // ************ File ************ //
  function handleToggleFileModal() {
    setToggleFileModal((s) => !s);
  }
  const downloadInfo = { locale, bucket, filePath };
  const fileInfo = { name, lastModified, size };
  return (
    <motion.li
      layout
      className="file-folder-li"
    >
      <div className="file-row-wrapper">
        <div className="file-row">
          <div
            className="file-row-left"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => onKeyDownFile(e)}
            data-path={filePath}
            data-type="file"
          >
            <div className="icon-wrapper"><FileIcon name={name} /></div>
            <p className="file-table-data name" aria-label="Filename">{name}</p>
            <p className="file-table-data last-modified" aria-label="Last Modified">{utcFormat(lastModified)}</p>
            <p className="file-table-data size" aria-label="File size">{fileSizeTruncate(size)}</p>
          </div>
          <div className="file-row-right">
            <IoInformationCircleSharp
              className="tablet info"
              title="File Info"
              aria-label="File Info"
              onClick={handleToggleFileModal}
            />
            <IoCloudDownloadOutline
              title={`Download ${name}`}
              aria-label={`Download ${name}`}
              className="desktop download"
              onClick={handleDownloadClick}
            />
            <FiTrash
              className="desktop delete"
              title={`Delete ${name}`}
              aria-label={`Delete ${name}`}
              onClick={handleToggleDeleteModal}
            />
          </div>
        </div>
        {toggleFileModal
        && (
        <ModalComponentWrapper close={handleToggleFileModal}>
          <FileModal
            fileInfo={fileInfo}
            downloadInfo={downloadInfo}
          />
        </ModalComponentWrapper>
        )}
        {toggleDeleteFileModal && (
          <ModalComponentWrapper>
            <DeleteFileModal name={name} deleteFileInfo={downloadInfo} />
          </ModalComponentWrapper>
        )}

      </div>
    </motion.li>
  );
}

FileLI.defaultProps = {
  bucket: '',
  type: '',
  name: '',
  lastModified: null,
  size: null,
  filePath: null,
  folderClick: null,
  locale: '',
  uploadClick: () => null,
};

FileLI.propTypes = {
  bucket: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  lastModified: propTypes.string,
  size: propTypes.number,
  filePath: propTypes.string,
  folderClick: propTypes.func,
  locale: propTypes.string,
  uploadClick: propTypes.func,
};
