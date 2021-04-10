const express = require('express');
const app = express();
const PORT = 3200;
const cors = require('cors');
const formidable = require('express-formidable');
const S3Upload = require('./S3Upload');
// const { getUploadID, conditionUpload } = require('./s3_upload_methods');
const jsonParser = express.json();
const S3UploadId = new S3Upload;
app.use(cors());

const classObject = {};

app.post('/getUploadId', jsonParser, (req, res, next) => {
  const { bucket, key } = req.body;
  S3UploadId.getUploadID(bucket, key)
      .then(({ UploadId }) => {
        classObject[UploadId] = new S3Upload;
        console.log('---->',classObject)
        res.send(UploadId);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post('/upload/:uid', formidable(), (req, res) => {
  const {
    Bucket, PartNumber,
    Key, UploadId, Body,
    finalChunk, numberOfChunks } = req.fields;

  classObject[req.params.uid].uploads({
    Bucket,
    PartNumber: Number(PartNumber),
    Key,
    UploadId,
    Body,
  }, !!finalChunk, numberOfChunks);
  // this res.send() pings the caller to send another chunk:
  // MultipartUpload - Line 87-90
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
