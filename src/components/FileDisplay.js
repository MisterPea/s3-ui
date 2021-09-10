/* eslint-disable no-loop-func */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useParseQuery from './helpers/useParseQuery';
import { getBucketContentsList, getBucketsAndContentsList } from '../redux/actions/bucket';
import FileLI from './FileLI';
import sortFiles from './helpers/sortFiles';
import LoadingBar from './graphic_elements/LoadingBar';
import ModalComponentWrapper from './ModalComponentWrapper';
import AddFolderModal from './AddFolderModal';

/**
 * Component to render Files and Folders
 * ** Note: id and loc are derived from query strings**
 * @return {JSX}
 */
export default function FileDisplay() {
  const { id, loc, path = null } = useParseQuery();
  const { buckets, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const [addFolderModal, setAddFolderModal] = useState(false);

  useEffect(() => {
    checkForBucket();
  }, []);

  useEffect(() => {
    setFilePath();
  }, [buckets, path]);

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
   * @return {func} Returns a state-setting function
   */
  function setFilePath(updatedPath = null) {
    buckets.filter((bucket) => (
      bucket.Name === id ? testPath(bucket) : null
    ));

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

  function handleToggleModal() {
    setAddFolderModal((s) => !s);
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
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <div>
      <div className="add-file-wrapper">
        <div className="add-file">
          <p>Add file(s)</p>
          <IoAddCircleSharp className="add-file-plus" />
        </div>
      </div>
      <div className="table-head file-display">
        <h3 className="name-header">Name</h3>
        <h3 className="last-modified-header">Last Modified</h3>
        <h3 className="size-header">Size</h3>
        <h3 className="options-header">Options</h3>
      </div>
      <AnimatePresence exitBeforeEnter>
        {loading ? <motion.div variants={loaderVariant} exit="exit"><LoadingBar /></motion.div>
          : (
            <motion.ul
              variants={fileVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {files && files.map(({
                type, name, lastModified = null, size, path: filePath,
              }, index) => (
                <li key={name + index.toString()}>
                  <FileLI
                    key={`${type}-${name}`}
                    type={type}
                    name={name}
                    lastModified={lastModified}
                    size={size}
                    filePath={filePath}
                    callback={handleFolderClick}
                  />
                </li>
              ))}
            </motion.ul>
          )}
      </AnimatePresence>

      <div
        className="add-bucket-bar"
        onClick={handleToggleModal}
      >
        <span className="bucket-button-elements">
          <div className="bucket-cta-wrapper">
            <h3>Add Folder</h3>
            <IoAddCircleSharp className="add-bucket-plus" />
          </div>
        </span>
      </div>
      {addFolderModal
      && (
      <ModalComponentWrapper close={handleToggleModal}>
        <AddFolderModal />
      </ModalComponentWrapper>
      )}
    </div>

  );
}
