const express = require('express');

const jsonParser = express.json();
const router = new express.Router();
const {
  getAllBuckets,
  createBucket,
  emptyBucket,
  getBucketContents,
  addFolder,
  deleteBucketContents,
  deleteBucket,
} = require('./S3_topLevelMethods');

router.get('/getBucketList', (req, res) => {
  getAllBuckets()
    .then((buckets) => {
      res.send(buckets);
    })
    .catch((err) => console.log(`ERROR in server-retrieving buckets: ${err}`));
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

module.exports = router;
