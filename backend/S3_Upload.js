const {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} = require('@aws-sdk/client-s3');

/**
 * A class containing methods to complete a multipart upload to a S3 bucket.
 * @param {String} region Region S3 bucket resides in.
 * The methods are:
 * - `getUploadId(bucket, key)` : returns an `UploadId`
 * - `upload(params, finalChunk)` : returns :void
 * -- Being a server-side class, the file must be chunked prior to calling
 * upload. The frontend encoding/chunking is accomplished
 * by `FileReader.readAsDataUrl`, so any `base64` encoding should work.
 * The 'finalChunk' arg is a `Bool` signifying whether the current chunk is
 * the final chunk being sent/called.
 */
module.exports = class S3Upload {
  // eslint-disable-next-line require-jsdoc
  constructor(region) {
    this.region = region;
    this.endpoint = encodeURI('http://localhost:4566');
    this.s3 = new S3Client({
      egion: this.region,
      endpoint: this.endpoint,
      forcePathStyle: true,
    });
    this.numberOfChunks = 0;
    this.chunksProcessed = 1;
    this.completeParams = {
      MultipartUpload: {
        Parts: [],
      },
    };
  }

  /**
 * Method to initiate multipart upload by getting an UploadId
 * @param {String} bucket S3 bucket name
 * @param {String} key Path and/or filename
 * @return {String} UploadId to be used for all upload parts
 */
  getUploadID(bucket, key) {
    const params = {
      Bucket: bucket,
      Key: key,
      CacheControl: 'max-age=1500', // in seconds
    };
    return this.s3.send(new CreateMultipartUploadCommand(params))
      .then((data) => data)
      .catch((err) => err);
  }

  /**
 * Helper function to convert the Body dataURL to a base64 buffer
 * @param {Object<string>} params Object containing items needed for upload
 * @param {bool} finalChunk Bool of whether the current data is the final chunk
 * @param {number} numberOfChunks Number of chunks that will be sent
 */
  uploads(params, finalChunk, numberOfChunks, callbackPassedIn) {
    const {
      Body, Bucket, PartNumber, Key, UploadId,
    } = params;
    const fileReaderData = Body.split(',');
    const buffer = Buffer.from(fileReaderData[1], 'base64');
    this.numberOfChunks = Number(numberOfChunks);
    if (finalChunk) {
      this.completeParams.Bucket = Bucket;
      this.completeParams.Key = Key;
      this.completeParams.UploadId = UploadId;
      this.completeParams.callback = callbackPassedIn;
    }
    this.uploadChunk({
      Bucket,
      PartNumber,
      Key,
      UploadId,
      Body: buffer,
    },
    finalChunk);
  }

  /**
 * Method to append/assemble this.completeParams for use on finishUpload.
 * On upload of all parts, finishUpload is called, with the
 * this.completeParams arg.
 * @param {Object<mixed>} data contains an ETag, PartNumber, finalChunk
 */
  partsFunc(data) {
    this.completeParams.MultipartUpload.Parts[data.PartNumber - 1] = data;
    console.log('proc:', this.chunksProcessed, 'total:', this.numberOfChunks);
    if (this.chunksProcessed === this.numberOfChunks) {
      this.finishUpload(this.completeParams);
    }
  }

  /**
 * Main upload method
 * @param {Object<string>} params Object data for upload chunk
 * @param {Bool} finalChunk Is the current chunk the last one sent?
 * @param {?Number} retries Optional number, passed in on retries
 */
  uploadChunk(params, finalChunk, retries = 0) {
    const { PartNumber } = params;
    const maxRetries = 5;
    this.s3.send(new UploadPartCommand(params))
      .then(({ ETag }) => {
        this.partsFunc({ ETag, PartNumber: Number(PartNumber) }, finalChunk);
        this.chunksProcessed += 1;
      })
      .catch(() => {
        if (retries <= maxRetries) {
          this.uploadChunk(params, finalChunk, retries + 1);
        } else {
          console.log(`Failure uploading part: ${PartNumber}`);
        }
      });
  }

  /**
 * Method to signal the server that the upload is complete.
 * @param {Object<mixed>} params contains an ETag, PartNumber, finalChunk,
 * UploadId and Key
 */
  finishUpload(params) {
    const { callback } = params;
    delete params.callback;
    this.s3.send(new CompleteMultipartUploadCommand(params))
      .then((ret) => {
        callback(ret);
      })
      .catch((err) => console.error(`Error finishing the upload:${err}`));
  }
};
