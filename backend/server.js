const express = require('express');
const app = express();
const PORT = 3200;
const cors = require('cors');
const formidable = require('express-formidable');
const { getUploadID, conditionUpload } = require('./s3_upload_methods');
const jsonParser = express.json();

app.use(cors());

app.post('/getUploadId', jsonParser, (req, res, next) => {
  const { bucket, key } = req.body;
  getUploadID(bucket, key)
      .then(({ UploadId }) => {
        res.send(UploadId);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post('/uploadChunks', formidable(), (req, res) => {
  const { Bucket, PartNumber, Key, UploadId, Body, finalChunk } = req.fields;
  conditionUpload({
    Bucket,
    PartNumber: Number(PartNumber),
    Key,
    UploadId,
    Body,
  }, !!finalChunk);
  // this res.send() pings the caller to send another chunk:
  // MultipartUpload - Line 87-90
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
