import * as React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { Folder } from './graphic_elements/Icons';
import FileIcon from './helpers/FileIcon';
import FolderTooltip from './FolderTooltip';
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
 * @prop {func} openOptions Callback for clicks to ellipsis button
 * @return {JSX}
 */
export default function FileLI({
  bucket, type, name, lastModified = null, size = null, filePath = null, folderClick, locale,
}) {
  const [toggleTooltip, setToggleTooltip] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [toggleUploadModal, setToggleUploadModal] = useState(false);

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

  const tooltipVariants = {
    open: {
      opacity: 1,
      transitionEnd: { zIndex: 10100 },
      scale: 1,
      x: -3,
      y: 2,
      transition: {
        type: 'tween',
        duration: 0.2,
        ease: [0.06, 0.83, 0.37, 1],
      },

    },
    closed: {
      opacity: 0,
      transitionEnd: { zIndex: 10000 },
      scale: 0.95,
      x: 5,
    },
    exit: {
      scaleY: 0.7,
      scaleX: 0.3,
      opacity: 0,
      transitionEnd: { zIndex: 10000 },
      transition: {
        type: 'tween',
        duration: 0.1,
        ease: [0.57, 0.24, 0.74, 0.86],
      },
    },
  };

  if (type === 'folder') {
    return (
      <div
        className="file-row"
      >
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
        <AnimatePresence>
          {toggleTooltip && (
          <motion.div
            variants={tooltipVariants}
            initial="closed"
            animate={toggleTooltip ? 'open' : 'closed'}
            key={name}
            exit="exit"
          >
            <FolderTooltip
              buttonClick={handleCloseTooltip}
              closeTooltip={handleToggleTooltip}
              toggleDeleteModal={handleDeleteModal}
              toggleUploadModal={handleUploadModal}
            />
          </motion.div>

          )}
        </AnimatePresence>
        { toggleDeleteModal
    && (
    <ModalComponentWrapper close={handleDeleteModal}>
      <FolderDeleteModal locale={locale} bucket={bucket} pathToDelete={filePath} folderName={name} />
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
