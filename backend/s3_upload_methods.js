const {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'us-east-1',
});

let numberOfChunks = 0;
let chunksProcessed = 1;

/**
 * Method to initiate multipart upload by getting an UploadId
 * @param {string} bucket S3 bucket name
 * @param {string} key Path and/or filename
 * @return {string} UploadId UploadId to be used for all upload parts
 */
function getUploadID(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
    CacheControl: 'max-age=1500', // in seconds
  };
  return s3.send(new CreateMultipartUploadCommand(params))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
};

/**
 * Helper function to conver the Body dataURL to a base64 buffer
 * @param {Object<string>} params Object containing items needed for upload
 * @param {bool} finalChunk Bool of whether the current data is the final chunk
 */
function conditionUpload(params, finalChunk) {
  const { Body, Bucket, PartNumber, Key, UploadId } = params;
  const fileReaderData = Body.split(',');
  const buffer = Buffer.from(fileReaderData[1], 'base64');

  if (finalChunk) {
    numberOfChunks = PartNumber;
    completeParams.Bucket = Bucket;
    completeParams.Key = Key;
    completeParams.UploadId = UploadId;
  }
  uploadChunk({Bucket, PartNumber, Key, UploadId, Body: buffer}, finalChunk);
}

const completeParams = {
  MultipartUpload: {
    Parts: [],
  },
};

const partsFunc = (data) => {
  completeParams.MultipartUpload.Parts[data.PartNumber - 1] = data;
  console.log('processed:', chunksProcessed, 'total:', numberOfChunks);
  if (chunksProcessed === numberOfChunks) {
    finishUpload(completeParams);
    console.log(completeParams);
  }
};

/**
 * Main upload method
 * @param {Object<string>} params Object data for upload chunk
 * @param {Bool} finalChunk Is the current chunk the last one sent?
 * @param {?Number} retries Optional number, passed in on retries
 */
function uploadChunk(params, finalChunk, retries = 0) {
  const {PartNumber} = params;
  const maxRetries = 5;
  s3.send(new UploadPartCommand(params))
      .then(({ETag}) => {
        partsFunc({ETag, PartNumber: Number(PartNumber)}, finalChunk);
        ++chunksProcessed;
      })
      .catch((err) => {
        console.log(`Error in upload: ${err}`);
        if (retries <= maxRetries) {
          console.log(`Retrying part: ${PartNumber}`);
          uploadChunk(params, finalChunk, retries++);
        } else {
          console.log(`Failure uploading part: ${PartNumber}`);
          return;
        }
      });
}

/**
 * s
 * @param {Object<mixed>} params a
 */
function finishUpload(params) {
  s3.send(new CompleteMultipartUploadCommand(params))
      .then((ret) => console.log('Finish:', ret))
      .catch((err) => console.error('Error in finish upload:', err));
};

module.exports = {getUploadID, conditionUpload};
