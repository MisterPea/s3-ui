import axios from 'axios';

/**
 * Multipart Upload Class
 * Takes in a Blob/File and a Bucket
 */
export class MultipartUpload {
  /**
   * @param {Blob} file File to be uploaded
   * @param {String} bucket S3 Bucket name
   */
  constructor(file, bucket) {
    this.file = file;
    this.bucket = bucket;
    this.sentPromises = [];
  }

  /**
   * Method to retrive an UploadId for MultipartUpload
   * @return {Promise<string>} Returns a promise containing `UploadId`
   */
  getUploadId() {
    return axios({
      method: 'POST',
      url: 'http://192.168.1.152:3200/getUploadId',
      data: {
        bucket: this.bucket,
        key: this.file.name,
      },
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  /**
   * Method that divides the uploaded file,
   * and sends its parts to `uploadFileChunks`
   * @param {string} uploadId is an identifier derived from `getUploadId`
   */
  uploadFile(uploadId) {
    const fileSize = this.file.size;
    const chunkSize = 1024 ** 2 * 5; // 5MB
    let currentChunk = 0;
    let offset = 0;
    let finalChunk = false;
    const numberOfChunks = Math.ceil(fileSize/chunkSize);

    const endOfFileInRange = () => {
      console.log(`${fileSize} - ${offset} <= ${chunkSize}`);
      return fileSize - offset <= chunkSize;
    };

    const fileChunk = () => {
      const beginOffset = offset;
      let endOffset;
      if (endOfFileInRange()) {
        finalChunk = true;
        endOffset = fileSize;
      } else {
        endOffset = offset + chunkSize;
      }
      offset += chunkSize;
      return this.file.slice(beginOffset, endOffset);
    };

    const sendChunk = () => {
      const reader = new FileReader();
      reader.readAsDataURL(fileChunk());
      reader.onloadend = () => {
        currentChunk += 1;
        const formData = new FormData();
        formData.append('Bucket', this.bucket);
        formData.append('Key', this.file.name);
        formData.append('PartNumber', currentChunk);
        formData.append('UploadId', uploadId);
        formData.append('Body', reader.result);
        formData.append('finalChunk', finalChunk);
        formData.append('numberOfChunks', numberOfChunks);
        axios({
          method: 'POST',
          url: `http://192.168.1.152:3200/upload/${uploadId}`,
          data: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
            .then(() => {
              if (!finalChunk) {
                sendChunk();
              } else {
                console.log('done');
              }
            });
      };
    };
    sendChunk();
  }
//   /**
//    * Method to handle the uploading of file chunks
//    * @param {Object<FormData>} formData UploadId derived from `getUploadId`
//    */
//   uploadFileChunks(formData) {
//     const uploadPartToS3 = axios({
//       method: 'POST',
//       url: 'http://192.168.1.152:3200/uploadChunks',
//       data: formData,
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     });
//     this.sentPromises.push(uploadPartToS3);
//   }
}
