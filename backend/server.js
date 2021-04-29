const express = require('express');
const app = express();
const PORT = 3200;
const cors = require('cors');
const formidable = require('express-formidable');
const jsonParser = express.json();
const S3Upload = require('./S3Upload');
const {
  getBucketList,
  createBucket,
  listBucketContents,
  getBucketRegion} = require('./s3BucketMethods');

const classObject = {};

app.use(cors());

app.post('/getUploadId', jsonParser, (req, res, next) => {
  const { bucket, key, region } = req.body;
  const S3UploadId = new S3Upload(region)

  S3UploadId.getUploadID(bucket, key, region)
      .then(({ UploadId }) => {
        classObject[UploadId] = new S3Upload(region);
        res.send(UploadId);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post('/upload/:uid', formidable(), (req, res) => {
  const {
    Bucket,
    PartNumber,
    Key,
    UploadId,
    Body,
    finalChunk,
    numberOfChunks } = req.fields;
  
  // classObject is a holder for independent class instances, so we have a way to keep track of them.
  classObject[req.params.uid].uploads({
    Bucket,
    PartNumber: Number(PartNumber),
    Key,
    UploadId,
    Body,
  }, !!finalChunk, numberOfChunks);
  // this res.send() pings the caller to send another chunk:
  // MultipartUpload - Lines 95-98
  res.send();
});

app.get('/bucketList', (req, res) => {
  getBucketList()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error(`There was a problem retrieving your buckets:${err}`);
      });
});

app.post('/addBucket', jsonParser, (req, res) => {
  const {bucket} = req.body
  createBucket(bucket)
    .then((res) => {
      console.log('server:::::',res)
    })
    .catch((err) => console.log(`Error creating bucket: ${err}`))
})

app.post('/listBucketContents', jsonParser, (req, res) => {
  const {bucket, region} = req.body;
  listBucketContents(bucket, region)
    .then((result) => {

      res.send(result);
    })
    .catch((err) => {
      console.error(`Error retrieving bucket contents: ${err}`);
    });
});

app.post('/getBucketRegion', jsonParser, (req, res) => {
  const {bucket} = req.body;
  getBucketRegion(bucket)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.error(`Error retrieving bucket region: ${err}`)
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
