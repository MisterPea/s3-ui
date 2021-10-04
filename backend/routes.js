const express = require('express');

const jsonParser = express.json();
const router = new express.Router();
const {
  getAllBuckets,
  createBucket,
  emptyBucket,
  getBucketContents,
  getBucketContentsForDeletion,
  addFolder,
  deleteBucketContents,
  deleteBucket,
  deleteFolder,
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

module.exports = router;
