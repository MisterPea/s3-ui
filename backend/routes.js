const express = require('express');

const jsonParser = express.json();
const router = new express.Router();
const {
  getAllBuckets,
  createBucket,
  emptyBucket,
  getBucketContents,
  getBucketContentsForDeletion,
  getLengthOfBucketObjects,
  addFolder,
  deleteBucketContents,
  deleteBucket,
  deleteFolder,
  downloadFile,
} = require('./S3_topLevelMethods');

router.get('/getBucketList', (req, res) => {
  getAllBuckets()
    .then((buckets) => {
      res.send(buckets);
    })
    .catch((err) => console.log(`ERROR in server-retrieving buckets: ${err}`));
});
// Error: TimeoutError: connect ETIMEDOUT 172.19.1.1:443: Getting buckets

router.post('/getBucketContents', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  getBucketContents(locale, bucket)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(`ERROR in server-retrieving bucket contents: ${err}`));
});

router.post('/getBucketContentsForDeletion', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  getBucketContentsForDeletion(locale, bucket)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(`ERROR in getting contents for deletion: ${err}`));
});

router.post('/getBucketObjectsLength', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  getLengthOfBucketObjects(locale, bucket)
    .then((data) => {
      res.send({ objectLength: data });
    })
    .catch((err) => next(`ERROR in getting length of bucket objects: ${err}`));
});

router.post('/getBucketsAndContents', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  getAllBuckets()
    .then((allBuckets) => {
      if (allBuckets.length > 0) {
        getBucketContents(locale, bucket)
          .then((data) => {
            res.status(200).send(allBuckets.map((bkt) => (
              (bkt.Name === bucket && bkt.Region === locale)
                ? ({ ...bkt, contents: data })
                : bkt
            )));
          }).catch((err) => next(err));
      }
    })
    .catch((err) => next(`ERROR in server-retrieving buckets in (BucketsAndContents): ${err}`));
});

router.post('/createBucket', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  createBucket(bucket, undefined, locale)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => next(err));
});
// ERROR in server-retrieving buckets in (BucketsAndContents): Error: TimeoutError: connect ETIMEDOUT 172.19.1.1:443: Getting buckets

router.post('/createFolder', jsonParser, (req, res, next) => {
  const {
    locale, folderPath, bucket, folderName,
  } = req.body;
  addFolder(locale, folderPath, bucket, folderName)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => next(err));
});

router.post('/deleteFolder', jsonParser, (req, res, next) => {
  const {
    locale, bucket, pathToDelete, folderName,
  } = req.body;
  deleteFolder(locale, bucket, pathToDelete, folderName)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => next(err));
});

router.post('/deleteBucket', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  deleteBucket(locale, bucket)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => next(err));
});

router.post('/downloadFile', jsonParser, (req, res, next) => {
  const { locale, bucket, key } = req.body;
  downloadFile(locale, bucket, key)
    .then((url) => {
      res.send(url);
    })
    .catch((err) => next(err));
});

module.exports = router;
