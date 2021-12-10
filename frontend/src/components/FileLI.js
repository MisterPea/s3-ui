import * as React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import { IoEllipsisVerticalCircle, IoInformationCircleSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { Folder } from './graphic_elements/Icons';
import FileIcon from './helpers/FileIcon';
import FolderDropdown from './FolderDropdown';
import FolderDeleteModal from './FolderDeleteModal';
import ModalComponentWrapper from './ModalComponentWrapper';
import FileModal from './FileModal';
import fileSizeTruncate from './helpers/fileSizeTruncate';

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
  const [toggleTooltip, setToggleTooltip] = useState(false);
  // For Folders
  const [toggleDeleteFolderModal, setToggleDeleteFolderModal] = useState(false);

  // For Files
  const [toggleFileModal, setToggleFileModal] = useState(false);

  function onKeyDownFolder(e) {
    e.preventDefault();
    if (e.key === 'Enter') folderClick(filePath);
  }

  // *********** Folder *********** //
  function handleToggleTooltip() {
    setToggleTooltip((s) => !s);
  }

  function handleCloseTooltip() {
    setToggleTooltip(false);
  }

  function handleDeleteModal() {
    setToggleDeleteFolderModal((s) => !s);
  }

  function formatLastModified(timeString) {
    const timeArray = timeString.split(/[T.]/);
    return `${timeArray[0]} ${timeArray[1]}`;
  }

  if (type === 'folder') {
    return (
      <motion.li
        layout
        className="file-folder-li"
      >
        <div className="file-row-wrapper">
          <div className="file-row">
            <div
              role="button"
              tabIndex={0}
              onClick={() => folderClick(filePath)}
              onKeyDown={(e) => onKeyDownFolder(e)}
              className="file-row-left"
              data-path={filePath}
              data-type="folder"
            >
              <div className="icon-wrapper"><Folder /></div>
              <p className="file-table-data">{name}</p>
            </div>
            <IoEllipsisVerticalCircle
              className="file-row-right"
              onClick={handleToggleTooltip}
            />
          </div>
          <FolderDropdown
            isOpen={toggleTooltip}
            toggleDeleteFolderModal={handleDeleteModal}
            closeDropdown={handleToggleTooltip}
            buttonClick={handleCloseTooltip}
            uploadClick={() => uploadClick(filePath)}
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
        <div
          className="file-row"
        >
          <div
            className="file-row-left"
            role="button"
            tabIndex={0}
            data-path={filePath}
            data-type="file"
          >
            <div className="icon-wrapper"><FileIcon name={name} /></div>
            <p className="file-table-data name">{name}</p>
            <p className="file-table-data last-modified">{() => formatLastModified(lastModified)}</p>
            <p className="file-table-data size">{() => fileSizeTruncate(size)}</p>
          </div>
          <IoInformationCircleSharp
            className="file-row-right"
            onClick={() => handleToggleFileModal()}
          />
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
