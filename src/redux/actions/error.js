export const ERR_GETTING_BUCKET_CONTENTS = 'ERR_GETTING_BUCKET_CONTENTS';

export function errorGettingBucketContents() {
  return {
    type: ERR_GETTING_BUCKET_CONTENTS,
    message: 'File not found',
  };
}
