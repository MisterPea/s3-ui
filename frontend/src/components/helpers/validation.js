/* eslint-disable no-useless-escape */
// • Bucket name must be between 3 and 63 characters long,
//   and can consist only of lowercase letters, numbers,
//   dots (.), and hyphens (-).
// • Bucket name must begin and end with a letter or number.
// • Bucket name must not be formatted as an IP address.
/**
* @param {string} name Name of bucket to be added
* @param {Array<string>} buckets Array of current bucket names
* @return {boolean} Returns true if formatting is valid; false if it's invalid
*/
export function validateBucketName(name, buckets) {
  const bucketExists = buckets.indexOf(name) === -1;
  const lengthAlphaTest = '^[a-z0-9][a-z0-9.-]{1,1023}[a-z0-9]$';
  const ipFormatTest = '^((?!(^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$)).)*$';
  const lengthValid = new RegExp(lengthAlphaTest);
  const ipValid = new RegExp(ipFormatTest);
  return lengthValid.test(name) && ipValid.test(name) && bucketExists;
}

/**
 * Validator for S3 objects (folders)
 * @param {string} name Name of the folder to be added
 * @param {Array<string>} folders Array of current folder names
 * @return {boolean} Returns true if formatting is valid; false if it's invalid
 */
export function validateFolderName(name, folders) {
  const folderExists = folders.indexOf(name) === -1;
  const folderNameTest = "^[A-Za-z0-9-()!_']{1,1023}$";
  const foldernameValid = new RegExp(folderNameTest);
  return foldernameValid.test(name) && folderExists;
}

/**
 * Method to ensure a unique filename by appending a dash and an incremented number.
 * If the filename is unique, then it's returned unchanged.
 * @param {string} uploadedFilename Name of the file upload (Key)
 * @param {array<string>} currentFiles Array of current, active, filenames.
 * @param {array<string>} newFilenames Array of currently uploaded filenames; for batch uploads
 * @return {string} Returns a unique filename
 */
export function ensureUniqueFilename(uploadedFilename, currentFiles, newFilenames) {
  let increment = 1;

  // removes dash number i.e.: -1, increment from filename
  const checkForPreviousIncrement = (filename) => filename.split(/(-\d+)$/)[0];

  // splits up the filename from the extension, if an extension is present
  const filenameAndExtension = () => {
    const hasExtension = uploadedFilename.indexOf('.');
    if (hasExtension > 1) {
      const splitName = uploadedFilename.split(/.(\w+)$/);
      return { name: checkForPreviousIncrement(splitName[0]), ext: splitName[1] };
    }
    return { name: checkForPreviousIncrement(uploadedFilename), ext: '' };
  };

  const allActiveFilenames = currentFiles.concat(newFilenames);
  const extension = filenameAndExtension().ext !== '' ? `.${filenameAndExtension().ext}` : '';
  function testFilename(filename) {
    if (allActiveFilenames.includes(filename)) {
      const tempFilename = `${filenameAndExtension().name}-${increment}${extension}`;
      increment += 1;
      return testFilename(tempFilename);
    }
    return filename;
  }
  return testFilename(uploadedFilename);
}
