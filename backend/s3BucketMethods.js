require('dotenv').config();

const {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  ListObjectsV2Command,
  GetBucketLocationCommand,
} = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'us-east-1',
});


/**
 * Method to retrieve the Names and Creation Date of existing S3 buckets
 * @return {Promise<objects[]>} Keys: Name & CreationDate
 */
const getBucketList = () => {
  const bucketData = s3.send(new ListBucketsCommand({}));
  return bucketData.then((data) => {
    return [data.Buckets];
  })
      .catch((err) => {
        console.log(err);
      });
};


/**
 * Method to create an empty S3 bucket
 * @param {String} bucketName Lowercase 3-63 characters a-z, 0-9, dots,hyphens.
 * Bucket naming rules:
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
 * @param {String} accessControl optional, defaults to private
 * - Other ACL options are: public-read | public-read-write | authenticated-read
 * - Other options are available, and this function can be extended
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property
 * @return {Promise<object>} Object keys are:
 * - Location
 * - $metadata <object>: has keys of:
 * -- httpStatusCode, requestId, extendedRequestId,
 * -- cdId, attempts, totalRetryDelay
 */
const createBucket = (bucketName, accessControl = 'private') => {
  const params = {
    Bucket: bucketName,
    ACL: accessControl,
  };
  const bucketData = s3.send(new CreateBucketCommand(params));
  return bucketData.then((data) => {
    return data;
  })
      .catch((err) => {
        console.log(err);
      });
};


/**
 * Method to retrieve bucket contents
 * @param {String} bucketName Name of S3 bucket
 * @param {String} region Region that the bucket resides in
 * - use the `getBucketRegion` method if region is not known
 */
const listBucketContents = (bucketName, region) => {
  let s3Local;
  if (region) {
    localizedS3Client(region)
  } else {
    localizedS3Client('us-east-1')
  }

  function localizedS3Client(localRegion) {
    s3Local = new S3Client({
      region: localRegion,
    })
  }

  const fileList = s3Local.send(new ListObjectsV2Command({Bucket: bucketName}))
  return fileList.then((res) => {
    const fileArray = sortFileArray(res.Contents)
    return tree(fileArray);
  })
  .catch((err) => console.error('File list error:', err))
}


/**
 * Synchronous method to retrieve the region a bucket resides in
 * @param {String} bucketName Name of S3 bucket
 * @returns {String} bucket region
 */
const getBucketRegion = (bucketName) => {
  const bucketRegion = s3.send(new GetBucketLocationCommand({Bucket: bucketName}))
  return bucketRegion.then(({LocationConstraint}) => {
      return LocationConstraint
    })
    .catch((err) => console.error(err))
}


/**
 * Method to turn paths and file info into hierarchial object organized by path
 * @param {object[]} fileList Array of objects coming from S3 listBucketContents
 * @returns {object[]} Return is an array of hierarchial objects representing the directory
 */
function tree(fileList) {
  let root = [];
  for (const entry of fileList) {
    const {Key, Size} = entry;
    const path = Key.split('/');
    const fileName = path.pop();
    const pathLength = path.length;

    let scope = root;
    let currentPath = '';

    for (let i = 0; i < pathLength; i++) {
      // are there folder matches?
      const match = scope.find((query) => query.name === path[i]);
      currentPath += (`/${path[i]}`);
      if (!match) {
        const child = {
          'type': 'folder',
          'name': path[i],
          'path': currentPath,
          'children': [],
        };
        scope.push(child);
        scope = child.children;
      } else {
        scope = match.children;
      }
      // at end of parsed string, push file
      if (i === pathLength - 1) {
        const file = {
          'type': 'file',
          'name': fileName, 
          'size': Size,
          'path': currentPath,
        };
        scope.push(file);
      }
    };
    // if we're root-level
    if (path.length === 0) {
      const file = {
        'type': 'file',
        'name': fileName, 
        'size': Size,
      };
      scope.push(file);
    }
  }
  return root;
}


/**
 * Helper method to sort the initial fileList array by path/filename (Key)
 * @param {object[]} fileArray Array of objects from the listBucketContents method
 * @returns {object[]} return is a sorted array of objects
 */
function sortFileArray(fileArray) {
  return fileArray.sort(({Key: a}, {Key: b}) => {
    return (a.match(/\//g) || []).length - (b.match(/\//g) || []).length;
  });
}

module.exports = {
  getBucketList,
  createBucket,
  listBucketContents,
  getBucketRegion,
};
 