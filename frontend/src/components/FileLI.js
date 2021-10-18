import * as React from 'react';
import { useState, useRef } from 'react';
import propTypes from 'prop-types';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { Folder } from './graphic_elements/Icons';
import FileIcon from './helpers/FileIcon';
import FolderDropdown from './FolderDropdown';
import FolderDeleteModal from './FolderDeleteModal';
import FolderUploadModal from './FolderUploadModal';
import ModalComponentWrapper from './ModalComponentWrapper';

/**
 * Component to render a folder or a file
 * @prop {string} type The type to be rendered `file` or `folder`
 * @prop {string} name Name associated with the file or folder
 * @prop {string} lastModified Date object was last modified (Only for files)
 * @prop {number} size Size of the file (Only for files)
 * @prop {string} filePath File path leading to children (Only for folders)
 * @prop {func?} folderClick Callback for folders that are clicked
 * @prop {string} locale Region of the bucker - passed to modal.
 * @return {JSX}
 */
export default function FileLI({
  bucket, type, name, lastModified = null, size = null, filePath = null, folderClick, locale,
}) {
  const [toggleTooltip, setToggleTooltip] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [toggleUploadModal, setToggleUploadModal] = useState(false);
  const isOpenRef = useRef(false);

  function onKeyDownFolder(e) {
    e.preventDefault();
    if (e.key === 'Enter') folderClick(filePath);
  }

  function handleToggleTooltip() {
    setToggleTooltip((s) => !s);
  }

  function handleCloseTooltip() {
    setToggleTooltip(false);
  }

  function handleDeleteModal() {
    setToggleDeleteModal((s) => !s);
  }

  function handleUploadModal() {
    setToggleUploadModal((s) => !s);
  }

  if (type === 'folder') {
    return (
      <div className="file-row-wrapper">
        <div className="file-row">
          <div
            role="button"
            tabIndex={0}
            onClick={() => folderClick(filePath)}
            onKeyDown={(e) => onKeyDownFolder(e)}
            className="file-row-left"
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
          isOpenRef={isOpenRef}
          toggleDeleteModal={handleDeleteModal}
          toggleUploadModal={handleUploadModal}
          closeDropdown={handleToggleTooltip}
          buttonClick={handleCloseTooltip}
        />
        { toggleDeleteModal
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
        { toggleUploadModal
    && (
    <ModalComponentWrapper close={handleUploadModal}>
      <FolderUploadModal />
    </ModalComponentWrapper>
    ) }
      </div>
    );
  }
  return (
    <div className="file-row-wrapper">
      <div
        className="file-row"
      >
        <div
          className="file-row-left"
          role="button"
          tabIndex={0}
        >
          <div className="icon-wrapper"><FileIcon name={name} /></div>
          <p className="file-table-data name">{name}</p>
          <p className="file-table-data last-modified">{lastModified}</p>
          <p className="file-table-data size">{size}</p>
        </div>
        <IoEllipsisVerticalCircle
          className="file-row-right"
        />
      </div>
    </div>
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
};
