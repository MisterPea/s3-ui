/* eslint-disable no-loop-func */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import useParseQuery from './helpers/useParseQuery';
import { getBucketContentsList, getBucketsAndContentsList } from '../redux/actions/bucket';
import FileLI from './FileLI';
import sortFiles from './helpers/sortFiles';
import LoadingBar from './graphic_elements/LoadingBar';
import ModalComponentWrapper from './ModalComponentWrapper';
import AddFolderModal from './AddFolderModal';
import useScrollIntersect from './helpers/useScrollIntersect';
import DragDrop from './DragDrop';
import { uploadFiles } from '../redux/actions/file';
import createId from './helpers/createId';

function EmptyBucket() {
  return (
    <><p className="empty-bucket">Looks like this is empty.</p></>
  );
}

/**
 * Component to render Files and Folders
 * ** Note: id and loc are derived from query strings**
 * @return {JSX}
 */
export default function FileDisplay() {
  const { id, loc, path = null } = useParseQuery();
  const { buckets, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [files, setFiles] = useState(undefined);
  const history = useHistory();
  const [addFolderModal, setAddFolderModal] = useState(false);

  useEffect(() => {
    checkForBucket();
  }, []);

  useEffect(() => {
    setFilePath();
  }, [buckets, path]);

  const [topScrollShadow, bottomScrollShadow, handleScroll] = useScrollIntersect(files, '.ul-wrapper');

  /**
   * Method to check store if bucket requested is in the store.
   * The checking involves both bucket and region perchance a
   */
  function checkForBucket() {
    if (buckets.length === 0) {
      return dispatch(getBucketsAndContentsList(loc, id));
    }
    return dispatch(getBucketContentsList(loc, id));
  }

  /**
   * Method to populate local state, based upon path. If path is passed to
   * `setFilePath` that means an explicit call from `ListItem` was made. If `setFilePath`
   * is called without args, it means an implicit change of path was made. So we derive
   * the desired path from `useParseQuery`.
   * @param {string} [updatedPath=null] The new path
   * @return {function} Returns a state-setting function
   */
  function setFilePath(updatedPath = null) {
    if (buckets[0] !== undefined) {
      buckets.filter((bucket) => (
        bucket.Name === id ? testPath(bucket) : null
      ));
    }

    // eslint-disable-next-line consistent-return
    function testPath(bucket) {
      let newPath;
      if (updatedPath === null) {
        newPath = path;
      } else {
        newPath = updatedPath;
      }

      if (newPath === null) {
        return setFiles(sortFiles(bucket.contents));
      }
      const pathArray = newPath.split('/');
      let currentChild = bucket.contents;
      for (let i = 0; i < pathArray.length; i += 1) {
        for (let j = 0; j < currentChild.length; j += 1) {
          if (currentChild[j].name === pathArray[i]) {
            if (pathArray.length - 1 === i) {
              return setFiles(sortFiles(currentChild[j].children));
            }
            currentChild = currentChild[j].children;
          }
        }
      }
    }
  }

  /**
   * Callback function for the ListItem component
   * @param {String} newPath Folder path
   */
  function handleFolderClick(newPath) {
    if (path === null) {
      const firstPath = newPath.substring(1);
      history.push(`${history.location.search}&path=${firstPath}`);
      setFilePath(firstPath);
    } else {
      const lastRoute = newPath.split('/');

      history.push(`${history.location.search}/${lastRoute[lastRoute.length - 1]}`);
      setFilePath(newPath);
    }
  }

  function handleToggleAddFolder() {
    setAddFolderModal((s) => !s);
  }

  function handleKeyboardAddFolder(e) {
    e.preventDefault();
    handleToggleAddFolder();
  }

  function handleAddFileButtonClick() {
    document.getElementById('add-files').click();
  }

  function handleFileSubmit() {
    const fileInput = document.querySelector('#add-files');
    const file = fileInput.files;
    dispatch(uploadFiles(loc, id, path || '', file));
  }

  /**
   * Test to determine if file list has been loaded and whether
   * it's just an artefact from folder creation
   * @param {Array{}} fileList Array of objects containing file/folder info.
   */
  function isEmptyFile(fileList) {
    if (fileList !== undefined) {
      if (fileList.length === 0) {
        return true;
      } if (fileList.length === 1 && fileList[0].name === '') {
        return true;
      }
      return false;
    }
    return true;
  }

  const loaderVariant = {
    exit: {
      opacity: 0,
      transition: {
        ease: 'circOut',
        when: 'beforeChildren',
        duration: 0.3,
      },
    },
  };

  const fileVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <div className="file-display-wrapper">
      <div className="file-header-wrapper">
        <div className="add-file-wrapper">
          <button
            type="button"
            onClick={handleAddFileButtonClick}
            className="add-file"
          >
            <input
              type="file"
              name="file"
              id="add-files"
              onChange={(e) => handleFileSubmit(e)}
            />
            <h3>ADD FILE(S)</h3>
            <IoAddCircleSharp className="add-file-plus" />
          </button>
        </div>
        <div className={`file-display ${topScrollShadow ? 'overflow' : ''}`}>
          <h3 className="name-header">NAME</h3>
          <h3 className="last-modified-header">Last Modified</h3>
          <h3 className="size-header">Size</h3>
          <h3 className="options-header">Options</h3>
        </div>
      </div>

      <AnimatePresence exitBeforeEnter>
        {loading ? <motion.div variants={loaderVariant} exit="exit"><LoadingBar /></motion.div>
          : (
            <motion.div
              key="file-motion-div"
              onScroll={(e) => handleScroll(e)}
              variants={fileVariants}
              initial="closed"
              animate={loading ? 'closed' : 'open'}
              exit="closed"
              className="ul-wrapper"
            >
              <AnimateSharedLayout>
                <DragDrop bucket={id} locale={loc}>
                  <motion.ul
                    layout
                    key="motion-file-ul"
                    className="file-ul"
                  >
                    {isEmptyFile(files) ? <EmptyBucket /> : files.filter((file) => file.name !== '').map(({
                      type, name, lastModified = null, size, path: filePath,
                    }) => (
                      <FileLI
                        key={name + type}
                        locale={loc}
                        bucket={id}
                        type={type}
                        name={name}
                        lastModified={lastModified}
                        size={size}
                        filePath={filePath}
                        folderClick={handleFolderClick}
                      />
                    ))}
                  </motion.ul>
                </DragDrop>
              </AnimateSharedLayout>
            </motion.div>
          )}
      </AnimatePresence>

      <div
        className={`add-bucket-bar${bottomScrollShadow ? ' overflow' : ''}`}
        onClick={handleToggleAddFolder}
        onKeyDown={(e) => handleKeyboardAddFolder(e)}
        tabIndex={0}
        role="button"
      >
        <span className="bucket-button-elements">
          <div className="bucket-cta-wrapper">
            <h3>ADD FOLDER</h3>
            <IoAddCircleSharp className="add-bucket-plus" />
          </div>
        </span>
      </div>
      {addFolderModal
      && (
      <ModalComponentWrapper close={handleToggleAddFolder}>
        <AddFolderModal />
      </ModalComponentWrapper>
      )}
    </div>
  );
}
