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
 * @param {string} bucketName Lowercase 3-63 characters a-z, 0-9, dots,hyphens.
 * Bucket naming rules:
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
 * @param {string} accessControl optional, defaults to private
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
    return res
  })
  .catch((err) => console.error('File list error:', err))
}

const getBucketRegion = (bucketName) => {
  const bucketRegion = s3.send(new GetBucketLocationCommand({Bucket: bucketName}))
  return bucketRegion.then(({LocationConstraint}) => {
      return LocationConstraint
    })
    .catch((err) => console.error(err))
}

module.exports = {
  getBucketList,
  createBucket,
  listBucketContents,
  getBucketRegion,
};
 