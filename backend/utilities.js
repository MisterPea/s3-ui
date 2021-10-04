/**
 * Method to turn paths and file info into hierarchial object organized by path
 * @param {object[]} fileList Array of objects coming from S3 listBucketContents
 * @return {object[]} Array of hierarchial objects representing the directory
 */
function tree(fileList) {
  const root = [];
  for (let f = 0; f < fileList.length; f += 1) {
    const { Key, Size, LastModified } = fileList[f];
    const path = Key.split('/');
    const fileName = path.pop();
    const pathLength = path.length;

    let scope = root;
    let currentPath = '';

    for (let i = 0; i < pathLength; i += 1) {
      // are there folder matches?
      const match = scope.find((query) => query.name === path[i]);
      currentPath += (`/${path[i]}`);
      if (!match) {
        const child = {
          type: 'folder',
          name: path[i],
          path: currentPath,
          children: [],
        };
        scope.push(child);
        scope = child.children;
      } else {
        scope = match.children;
      }
      // at end of parsed string, push file
      if (i === pathLength - 1) {
        const file = {
          type: 'file',
          name: fileName,
          lastModified: LastModified,
          size: Size,
          path: currentPath,
        };
        scope.push(file);
      }
    }
    // if we're root-level
    if (path.length === 0) {
      const file = {
        type: 'file',
        name: fileName,
        lastModified: LastModified,
        size: Size,
      };
      scope.push(file);
    }
  }
  return root;
}

/**
 * Method returns a regular expression object used to test
 * whether a path is to be deleted.
 * @param {string} pathToDelete Path to derive the regular expression
 * @return The return is new RegExp object
 */
function isPathDeletable(pathToDelete) {
  const pathArray = pathToDelete.split('/').filter(Boolean);
  return new RegExp(`^${pathArray.join('\\/')}\\/.*`);
}

module.exports = { tree, isPathDeletable };
