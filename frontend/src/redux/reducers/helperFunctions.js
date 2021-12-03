/**
 * Method that returns a new state object with the appropriate file added.
 * @param {string[]} targetPath slash `/` separated path string.
 * @param {object} fileName Object of strings denoting the `type: 'file'`, `name`,
 * `lastModified`, and `size`
 * @param {number} size Size in bytes of the file
 * @param {string} bucketName Name of the bucket where the file is to reside
 * @param {string} lastModified ISO string of the date the file was last modified
 * @param {object[]} state Array of arrays of objects
 * @return New array with the new file in place
 * filePath, fileName, size, lastModified
 */
export function addFile(bucketName, targetPath, fileName, size, lastModified, state) {
  function addToChildren(item, targetArray, currentPath) {
    if (currentPath === item.name) {
      if (targetArray.length === 0) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              type: 'file',
              name: fileName,
              lastModified,
              size,
              path: targetPath,
            },
          ],
        };
      }
      // if match, but not at terminus
      return { ...item, children: parseParent(item.children, targetArray) };
    }
    // if no match
    return item;
  }

  function rootLevelFolder() {
    return {
      type: 'file',
      name: fileName,
      lastModified,
      size,
      path: targetPath,
    };
  }

  function parseParent(currentBuckets, targetArray) {
    const currentPath = targetArray.shift();
    return currentBuckets.map((item) => addToChildren(item, targetArray, currentPath));
  }

  function addFileMain() {
    return state.map((_bucket) => {
      return _bucket.Name === bucketName ? rootCheck(_bucket) : _bucket;

      function rootCheck(bucket) {
        if (targetPath.length === 0) {
          return { ...bucket, contents: [...bucket.contents, rootLevelFolder()] };
        }
        return { ...bucket, contents: parseParent(bucket.contents, targetPath.split('/').filter(Boolean)) };
      }
    });
  }
  return addFileMain();
}

/**
 * Method to return a new state array with the new folder
 * @param {string} targetPath Path when new folder will reside
 * @param {string} folderName Name of new folder
 * @param {string} bucketName Name of bucket where new folder is to reside
 * @param {Object[]} state Array of arrays of objects
 * @return New array with the new folder in place
 */
export function addFolder(targetPath, folderName, bucketName, state) {
  function addToChildren(item, targetArray, currentPath) {
    if (currentPath === item.name || currentPath === '/') {
      if (targetArray.length === 0) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              type: 'folder',
              name: folderName,
              path: `${item.path}/${folderName}`,
              children: [],
            },
          ],
        };
      }
      // if match, but not at terminus
      return { ...item, children: [parseParent(item.children, targetArray)] };
    }
    // if no match
    return item;
  }

  function rootLevelFolder() {
    return {
      type: 'folder',
      name: folderName,
      path: `/${folderName}`,
      children: [],
    };
  }

  function parseParent(currentBuckets, targetArray) {
    const currentPath = targetArray.shift();
    return currentBuckets.map((item) => addToChildren(item, targetArray, currentPath));
  }

  function addFolderMain() {
    return state.map((_bucket) => {
      return _bucket.Name === bucketName ? rootCheck(_bucket) : _bucket;

      function rootCheck(bucket) {
        if (targetPath === '/') {
          return { ...bucket, contents: [...bucket.contents, rootLevelFolder()] };
        }
        return { ...bucket, contents: parseParent(bucket.contents, targetPath.split('/').filter(Boolean)) };
      }
    });
  }
  return addFolderMain();
}

/**
 * Method to return a new state array with the proper folder removed
 * @param {string} objectType Type of object to delete (either `folder` or `file`)
 * @param {string} bucketName Name of bucket folder resides
 * @param {string} pathToDelete Absolute path of folder to be deleted
 * @param {Object[]} state Array of arrays of objects
 * @return New array with the proper folder deleted
 */
export function deleteObject(objectType, bucketName, pathToDelete, state) {
  return state.map((bucket) => (bucket.Name === bucketName
    ? {
      ...bucket,
      contents: isRootLevel(
        bucket.contents,
        pathToDelete.split('/').filter(Boolean),
      ),
    }
    : bucket));

  function isRootLevel(contents, path) {
    if (path.length === 1) {
      const currentPath = path.shift();
      const filteredContent = contents.filter(
        ({ type, name }) => name !== currentPath || type !== objectType,
      );
      return filteredContent;
    }
    return crawlChildren(contents, path);

    function crawlChildren(passedContents, passedPath) {
      const currentPath = passedPath.shift();
      return passedContents.map((item) => {
        if (item.type === 'folder' && item.name === currentPath) {
          if (passedPath.length === 1) {
            const children = item.children.filter(
              ({ type, name }) => name !== passedPath[0] || type !== objectType,
            );
            return { ...item, children: crawlChildren(children, passedPath) };
          }
          return {
            ...item,
            children: crawlChildren(item.children, passedPath),
          };
        }
        return item;
      });
    }
  }
}
