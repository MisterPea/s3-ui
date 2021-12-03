import { useState, useEffect } from 'react';
import sortFiles from './sortFiles';
/**
 * Method to populate local state. Returns current state according to path chosen
 * @param {Array<Object>} buckets Array of bucket objects
 * @param {string} id A string representing the current bucket
 * @param {string} path An empty string at root-level or a slash delineated string elsewhere
 * @returns {Array} Returns an array of objects that are at the appropriate path
 */
export default function useSetFilePath(buckets, id, path) {
  const [files, setFiles] = useState(undefined);
  const newPath = path || '';
  const pathArray = newPath.split('/').filter(Boolean);

  useEffect(() => {
    if (buckets[0] !== undefined) {
      buckets.filter(({ Name, contents }) => {
        if (Name === id) {
          return followPath(contents);
        }
        return null;
      });
    }
  }, [buckets, path]);
  return files;

  function followPath(contentInner) {
    if (pathArray.length === 0) {
      return setFiles(sortFiles(contentInner));
    }

    const currentPath = pathArray.shift();

    for (let i = 0; i < contentInner.length; i += 1) {
      if (contentInner[i].name === currentPath && contentInner[i].type === 'folder') {
        return followPath(contentInner[i].children);
      }
    }
    return followPath(contentInner);
  }
}
