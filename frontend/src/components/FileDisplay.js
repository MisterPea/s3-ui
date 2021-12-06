/* eslint-disable no-loop-func */
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import useParseQuery from './helpers/useParseQuery';
import { getBucketContentsList, getBucketsAndContentsList } from '../redux/actions/bucket';
import FileLI from './FileLI';
import LoadingBar from './graphic_elements/LoadingBar';
import ModalComponentWrapper from './ModalComponentWrapper';
import AddFolderModal from './AddFolderModal';
import useScrollIntersect from './helpers/useScrollIntersect';
import DragDrop from './DragDrop';
import { uploadFiles } from '../redux/actions/file';
import useSetFilePath from './helpers/useSetFilePath';

function EmptyBucket() {
  return (
    <><motion.p layout className="empty-bucket">Looks like this is empty.</motion.p></>
  );
}

/**
 * Component to render Files and Folders
 * ** Note: id and loc are derived from query strings**
 * @return {JSX}
 */
export default function FileDisplay() {
  const { id, loc, path: currentPath = null } = useParseQuery();
  const { buckets, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [[scrollTarget], setScrollTarget] = useState([null]);
  const location = useRef(null);

  useEffect(() => {
    checkForBucket();
  }, []);

  const files = useSetFilePath(buckets, id, currentPath);

  const [
    topScrollShadow,
    bottomScrollShadow,
    handleScroll] = useScrollIntersect(files, scrollTarget);
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
   * Callback function for the FileLI components
   * Route change is done implicitly via query string
   * @param {String} newPath Folder path
   */
  function handleFolderClick(newPath) {
    if (currentPath === null) {
      const firstPath = newPath.substring(1);
      history.push(`${history.location.search}&path=${firstPath}`);
    } else {
      const lastRoute = newPath.split('/');
      history.push(`${history.location.search}/${lastRoute[lastRoute.length - 1]}`);
    }
  }

  function handleToggleAddFolder() {
    setAddFolderModal((s) => !s);
  }

  function handleKeyboardAddFolder(e) {
    e.preventDefault();
    handleToggleAddFolder();
  }

  function handleAddFileButtonClick(folderLocation = null) {
    if (folderLocation) {
      location.current = folderLocation;
    }
    document.getElementById('add-files').click();
  }

  function clearFileInput() {
    const currentInput = document.querySelector('#add-files');
    currentInput.value = '';
  }

  function handleFileSubmit() {
    const fileInput = document.querySelector('#add-files');
    const file = fileInput.files;
    const writePath = currentPath ? `/${currentPath}` : '';
    dispatch(uploadFiles(loc, id, location.current || writePath, file));
    clearFileInput();
  }

  function currentFolders() {
    return files.filter((file) => file.type === 'folder').map((folder) => folder.name);
  }

  const createKey = (name, filePath, type) => `${name}${filePath}${type}`.replace(/[\\/./\s]/g, '');

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

  // Called upon the completion of list animation.
  function handleFinishScroll() {
    setScrollTarget(document.getElementsByClassName('ul-wrapper'));
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
            onClick={() => handleAddFileButtonClick(null)}
            className="add-file"
          >
            <input
              key={currentPath}
              type="file"
              name="file"
              id="add-files"
              multiple
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
              onAnimationComplete={(height) => handleFinishScroll()}
            >
              <LayoutGroup>
                <DragDrop bucket={id} locale={loc}>
                  <motion.ul
                    layoutScroll
                    key="motion-file-ul"
                    className="file-ul"
                  >
                    {isEmptyFile(files) ? <EmptyBucket /> : files.map(({
                      type, name, lastModified = null, size, path: filePath,
                    }) => (
                      <FileLI
                        key={createKey(name, filePath || '', type)}
                        locale={loc}
                        bucket={id}
                        type={type}
                        name={name}
                        lastModified={lastModified}
                        size={size}
                        filePath={filePath}
                        folderClick={handleFolderClick}
                        uploadClick={handleAddFileButtonClick}
                      />
                    ))}
                  </motion.ul>
                </DragDrop>
              </LayoutGroup>
            </motion.div>
          )}
      </AnimatePresence>

      <motion.div
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
      </motion.div>
      {addFolderModal
      && (
      <ModalComponentWrapper close={handleToggleAddFolder}>
        <AddFolderModal folders={currentFolders} />
      </ModalComponentWrapper>
      )}
    </div>
  );
}
