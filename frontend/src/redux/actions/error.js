export const ERR_GETTING_BUCKET_CONTENTS = 'ERR_GETTING_BUCKET_CONTENTS';
export const ERR_GETTING_BUCKETS = 'ERR_GETTING_BUCKETS';
export const ERR_CREATING_BUCKET = 'ERR_CREATING_BUCKET';
export const ERR_CREATING_FOLDER = 'ERR_CREATING_FOLDER';
export const ERR_DELETING_FOLDER = 'ERR_DELETING_FOLDER';
export const ERR_DELETING_BUCKET = 'ERR_DELETING_BUCKET';
export const ERR_DELETING_FILE = 'ERR_DELETING_FILE';
export const ERR_DOWNLOADING_FILE = 'ERR_DOWNLOADING_FILE';
export const ERR_GETTING_FOLDER_INFO = 'ERR_GETTING_FOLDER_INFO';
export const RESET_ERROR = 'RESET_ERROR';

export function errorGettingBucketContents() {
  return {
    type: ERR_GETTING_BUCKET_CONTENTS,
    message: 'File not found',
  };
}

export function errorGettingBuckets() {
  return {
    type: ERR_GETTING_BUCKETS,
    message: 'Could not retrieve buckets',
  };
}

export function errorGettingFolderInfo() {
  return {
    type: ERR_GETTING_FOLDER_INFO,
    message: 'Could not get folder info',
  };
}

export function errorCreatingBucket() {
  return {
    type: ERR_CREATING_BUCKET,
    message: 'Could not create bucket',
  };
}

export function errorCreatingFolder() {
  return {
    type: ERR_CREATING_FOLDER,
    message: 'Could not create new folder',
  };
}

export function errorDeletingFolder() {
  return {
    type: ERR_DELETING_FOLDER,
    message: 'Could not delete folder',
  };
}

export function errorDeletingBucket() {
  return {
    type: ERR_DELETING_BUCKET,
    message: 'Could not delete folder',
  };
}

export function errorDeletingFile() {
  return {
    type: ERR_DELETING_FILE,
    message: 'Could not delete file',
  };
}

export function errorDownloadingFile() {
  return {
    type: ERR_DOWNLOADING_FILE,
    message: 'Error downloading file',
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
    message: null,
  };
}
