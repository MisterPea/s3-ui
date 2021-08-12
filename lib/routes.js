const express = require('express');
const jsonParser = express.json()
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

router.post('/getBucketContents', jsonParser, (req, res) => {
  const {locale, bucket} = req.body
  getBucketContents(locale, bucket)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => console.log(`ERROR in server-retrieving bucket contents: ${err}`));
})

module.exports = router;
