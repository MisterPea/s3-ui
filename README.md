## S3 Uploader

Interface to drag and drop content to a database.
<hr />
The basic setup will be:

- A user chooses which file(s) to upload and the bucket they'll reside. 
- The file/bucket info is passed to axios, which is passed to express.
- Express calls the `CreateMultipartUpload` method, which returns an `UploadId`.
- The file is sliced into 5MB chunks and passed via body data along with `UploadId`, `Key` and `Bucket` via `UploadPart`.
- Once all the slices are uploaded, the `CompleteMultipartUpload` method is called.
