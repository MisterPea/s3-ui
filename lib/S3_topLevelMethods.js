const {
  S3Client,
  ListBucketsCommand,
  GetBucketLocationCommand,
} = require('@aws-sdk/client-s3');

const region = 'us-east-1';

const s3 = new S3Client({
  region: region,
});

/**
 * Method to retrieve a list of buckets associated with the current S3 client
 * @return {Promise[]} Array of objects with keys: `Name` and `CreationDate`
 */
function getBuckets() {
  return s3.send(new ListBucketsCommand({}))
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(`Error retrieving buckets: ${err}`));
}

/**
 * Method to retrieve the region of S3 buckets
 * @param {Object[]} buckets Array of objects containing Name and CreationDate
 * @return {Promise[]} Returns an array of objects with the keys:
 *`Name`,`Region` and `CreationDate`
 */
function getBucketRegion(buckets) {
  return Promise.all(
      buckets.map(({Name, CreationDate}) => {
        return getRegionPromise(Name)
            .then((Region) => {
              return {
                Name,
                Region: Region.LocationConstraint || region,
                CreationDate,
              };
            });
      }),
  ).then((results) => {
    return results;
  });

  // eslint-disable-next-line require-jsdoc
  function getRegionPromise(Name) {
    return s3.send(new GetBucketLocationCommand({Bucket: Name}))
        .then((region) => {
          return region;
        })
        .catch((err) => {
          console.log(`Error getting region for: ${Name}:: ${err}`);
        });
  };
}


module.exports = {getBuckets, getBucketRegion};
