/**
 *  Method returns the filenames of a particular folder
 * @param {array} buckets Array of objects derived from getState().
 * @param {string} bucketName Name of S3 bucket
 * @param {string} path An empty string or slash-separated folder-path
 * @return {array} Return is an array of filenames
 */
export default function findFilenames({ buckets }, bucketName, path) {
  const pathArray = path.split('/').filter(Boolean);

  const targetBucket = (() => {
    for (let i = 0; i < buckets.length; i += 1) {
      if (buckets[i].Name === bucketName) {
        return buckets[i].contents;
      }
    }
  })();

  function findChildren(childrenArray) {
    if (pathArray.length > 0) {
      const currentPath = pathArray.shift();
      for (let i = 0; i < childrenArray.length; i += 1) {
        if (childrenArray[i].name === currentPath) {
          return findChildren(childrenArray[i].children);
        }
      }
    } else {
      return childrenArray;
    }
    return [];
  }
  return findChildren(targetBucket)
    .map((element) => element.type === 'file' && element.name)
    .filter(Boolean);
}
