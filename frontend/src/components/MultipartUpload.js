import axios from 'axios';

/**
 * Multipart Upload Class
 * Takes in a Blob/File and a Bucket
 */
export default class MultipartUpload {
  /**
   * @param {Blob} file File to be uploaded
   * @param {String} bucket S3 Bucket name
   * @param {String} region S3 Bucket region
   */
  constructor(file, bucket, region, filename) {
    this.file = file;
    this.filename = filename;
    this.size = file.size;
    this.lastModified = file.lastModified;
    this.path = file.path.substring(1);
    this.key = this.path !== '' ? `${this.path}/${filename}` : filename;
    this.region = region;
    this.bucket = bucket;
    this.sentPromises = [];
    this.totalBytesLoaded = 0;
    this.base64Size = Math.round((4 * ((this.size + 2) / 3)));
    this.hostname = window.location.hostname;
  }

  /**
   * Method to retrieve an UploadId for MultipartUpload
   * @return {Promise<string>} Returns a promise containing an `UploadId`
   */
  getUploadId() {
    return axios({
      method: 'POST',
      url: `http://${this.hostname}/upload/getUploadId`,
      data: {
        bucket: this.bucket,
        key: this.key,
        region: this.region,
      },
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  /**
   * Method that divides the uploaded file,
   * and sends its parts to `uploadFileChunks`.
   * @param {String} uploadId is an identifier derived from `getUploadId`
   * @param {func} uploadCallback Progress callback
   * @param {func} serverCallback Callback fired when server resolves upload
    */
  uploadFile(uploadId, uploadCallback, serverCallback) {
    const chunkSize = 1024 ** 2 * 5; // 5MB
    let currentChunk = 0;
    let offset = 0;
    let finalChunk = false;
    const numberOfChunks = Math.ceil(this.size / chunkSize);

    const endOfFileInRange = () => this.size - offset <= chunkSize;

    const fileChunk = () => {
      const beginOffset = offset;
      let endOffset;
      if (endOfFileInRange()) {
        finalChunk = true;
        endOffset = this.size;
      } else {
        endOffset = offset + chunkSize;
      }
      offset += chunkSize;
      return this.file.slice(beginOffset, endOffset);
    };

    /**
     * In this method, the `UploadID` is passed as a URL param, so
     * we can create a unique, identifiable class instance. This
     * allows us to know where we're sending upload data and allow us
     * independently upload multiple files at once without worrying
     * about the data from one file accidentally being added to another file.
     */
    const sendChunk = () => {
      const reader = new FileReader();
      reader.readAsDataURL(fileChunk());
      reader.onloadend = () => {
        currentChunk += 1;
        const formData = new FormData();
        formData.append('Bucket', this.bucket);
        formData.append('Key', this.key);
        formData.append('PartNumber', currentChunk);
        formData.append('UploadId', uploadId);
        formData.append('Body', reader.result);
        formData.append('finalChunk', finalChunk);
        formData.append('numberOfChunks', numberOfChunks);
        axios({
          method: 'POST',
          url: `http://${this.hostname}/upload/${uploadId}`,
          data: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
          onUploadProgress: (fileInfo) => {
            this.totalBytesLoaded += fileInfo.loaded;
            const percent = Math.round((
              this.totalBytesLoaded * 100) / this.base64Size);
            uploadCallback({
              title: this.filename,
              p: `${percent <= 100 ? percent : 100}%`,
            });
          },
        })
          .then((metaDataReturn) => {
            if (metaDataReturn) {
              const isoDate = new Date(this.lastModified).toISOString();
              /* we append size, path, and date to the object so we can access it when
              the upload is finished. We have to do this way because if there are
              simultaneous uploads, we would have to keep track of it from where we
              initiate the upload. With this method, as uploads are completed, they are
              dispatched with the proper file info, which is derived from here, when
              the upload completes. This is ultimately sent to the file.js Action Creator */
              const newData = {
                ...metaDataReturn,
                size: this.size,
                lastModified: isoDate,
                filePath: this.file.path,
                fileName: this.filename,
              };
              serverCallback(newData);
            }
            if (!finalChunk) {
              sendChunk();
            }
          });
      };
    };
    sendChunk();
  }
}
