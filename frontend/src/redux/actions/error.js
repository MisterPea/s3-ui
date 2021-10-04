export const ERR_GETTING_BUCKET_CONTENTS = 'ERR_GETTING_BUCKET_CONTENTS';
export const ERR_GETTING_BUCKETS = 'ERR_GETTING_BUCKETS';
export const ERR_CREATING_BUCKET = 'ERR_CREATING_BUCKET';
export const ERR_CREATING_FOLDER = 'ERR_CREATING_FOLDER';
export const ERR_DELETING_FOLDER = 'ERR_DELETING_FOLDER';

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
