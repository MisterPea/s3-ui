const express = require('express');

const jsonParser = express.json();
const router = new express.Router();
const {
  getAllBuckets,
  createBucket,
  getBucketContents,
  getLengthOfBucketObjects,
  addFolder,
  deleteBucket,
  deleteFile,
  deleteFolder,
  downloadFile,
} = require('./S3_topLevelMethods');

router.get('/getBucketList', (req, res, next) => {
  getAllBuckets()
    .then((buckets) => {
      res.send(buckets);
    })
    .catch((err) => next(`ERROR in server-retrieving buckets: ${err}`));
});

router.post('/getBucketObjectsLength', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  getLengthOfBucketObjects(locale, bucket)
    .then((data) => {
      res.send({ objectLength: data });
    })
    .catch((err) => next(`ERROR in getting length of bucket objects: ${err}`));
});

router.post('/getBucketContents', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  getBucketContents(locale, bucket)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(`ERROR in server-retrieving bucket contents: ${err}`));
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

router.post('/deleteBucket', jsonParser, (req, res, next) => {
  const { locale, bucket } = req.body;
  deleteBucket(locale, bucket)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
});

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

router.get('/downloadFile', jsonParser, (req, res, next) => {
  const { locale, bucket, key } = req.query;
  const filenameArray = key.split('/').filter(Boolean);
  const filename = filenameArray[filenameArray.length - 1];

  res.attachment(filename);
  downloadFile(locale, bucket, key)
    .then((result) => {
      result.pipe(res);
    })
    .catch((err) => next(err));
});

router.delete('/file', jsonParser, (req, res, next) => {
  const { locale, bucket, key } = req.body;
  deleteFile(locale, bucket, key)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
});

module.exports = router;
