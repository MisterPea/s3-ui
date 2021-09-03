/* eslint-disable no-loop-func */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion';
import useParseQuery from './helpers/useParseQuery';
import { getBucketContentsList, getBucketsAndContentsList } from '../redux/actions/bucket';
import FileLI from './FileLI';
import sortFiles from './helpers/sortFiles';

/**
 * Component to render Files and Folders
 * ** Note: id and loc are derived from query strings**
 * @return {JSX}
 */
export default function FileDisplay() {
  const { id, loc, path = null } = useParseQuery();
  const buckets = useSelector((state) => state.buckets);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([{ Key: 'Nothing here' }]);
  const history = useHistory();

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

  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    out: {
      opacity: 0,
      x: '-100vw',
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: '100vw',
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="out"
      animate="in"
      exit="exit"
    >
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

      <ul>
        {files && files.map(({
          type, name, lastModified = null, size, path: filePath,
        }, index) => (
          <li key={name + index.toString()}>
            <FileLI
              type={type}
              name={name}
              lastModified={lastModified}
              size={size}
              filePath={filePath}
              callback={handleFolderClick}
            />
          </li>
        ))}
      </ul>

      <div className="add-bucket-bar">
        <span className="bucket-button-elements">
          <div className="bucket-cta-wrapper">
            <h3>Add Folder</h3>
            <IoAddCircleSharp className="add-bucket-plus" />
          </div>
        </span>
      </div>
    </motion.div>
  );
}
