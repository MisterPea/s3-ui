/* eslint-disable no-useless-escape */
// • Bucket name must be between 3 and 63 characters long,
//   and can consist only of lowercase letters, numbers,
//   dots (.), and hyphens (-).
// • Bucket name must begin and end with a letter or number.
// • Bucket name must not be formatted as an IP address.
export function validateBucketName(name) {
  const lengthAlphaTest = '^[a-z0-9][a-z0-9.-]{1,1023}[a-z0-9]$';
  const ipFormatTest = '^((?!(^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$)).)*$';
  const lengthValid = new RegExp(lengthAlphaTest);
  const ipValid = new RegExp(ipFormatTest);
  return lengthValid.test(name) && ipValid.test(name);
}

export function validateFolderName(name) {
  const folderNameTest = "^[\\w\\d\\-()_.!']{1,1023}[\\w\\d\\-()_!']$";
  const foldernameValid = new RegExp(folderNameTest);
  return foldernameValid.test(name);
}
