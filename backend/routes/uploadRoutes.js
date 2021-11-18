const express = require('express');
const formidable = require('express-formidable');
const S3Upload = require('../S3_Upload');

const jsonParser = express.json();
const router = new express.Router();
const classObject = {};

router.post('/getUploadId', jsonParser, (req, res, next) => {
  const { bucket, key, region } = req.body;

  const S3UploadId = new S3Upload(region);

  S3UploadId.getUploadID(bucket, key, region)

    .then(({ UploadId }) => {
      classObject[UploadId] = new S3Upload(region);
      res.send(UploadId);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/:uid', formidable(), (req, res, next) => {
  const {
    Bucket,
    PartNumber,
    Key,
    UploadId,
    Body,
    finalChunk,
    numberOfChunks,
  } = req.fields;

  const finish = (data) => {
    // res.sendStatus(data.$metadata.httpStatusCode);
    res.send(data);
  };

  const metaDataCallback = (uploadResult = null) => {
    if (uploadResult) {
      finish(uploadResult);
    }
  };

  /**
   * classObject is a holder for independent class instances,
   * so we have a way to keep track of them.
   */
  classObject[req.params.uid].uploads({
    Bucket,
    PartNumber: Number(PartNumber),
    Key,
    UploadId,
    Body,
  }, !!finalChunk, numberOfChunks, metaDataCallback);
  // this res.send() pings the caller to send another chunk:
  // MultipartUpload - Lines 112-115
  if (Number(PartNumber) < Number(numberOfChunks)) {
    res.send();
  }
});

module.exports = router;
