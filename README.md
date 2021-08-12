## S3 Uploader

Methods to operate buckets and upload files to S3.
<hr />
The basic setup for multipart-uploading is:

- A user chooses which file(s) to upload and the bucket they'll reside.
- On Submit, Express calls the `CreateMultipartUpload` method, which returns an `UploadId`.
- The file/Blob is sliced into 5MB chunks and each chunk is converted to a `base64` string via `FileReader()`.
- This is then passed in body data, via `FormData()` to the server.
  * Within the server, a class instance is created for each upload instance.
- On the server-side the file chunk is encoded into a `Buffer` and is sent to the `UploadPart` method along with `UploadId`, `PartNumber`, `Key` and `Bucket`.
- `UploadPart` returns a promise that gives an `ETag` which is stored in an array along with its corresponding `PartNumber`.
- Upon the completion of all uploaded parts `UploadId`, `Key`, `Bucket`, and a `Parts` array with all the `ETag` and `PartNumber` is sent to `CompleteMultipartUpload`.
- At this point the file chunks are stitched back together into a recognizable file.
<hr />

### To do:
**API Methods:**
* [ ] Get List of Buckets - Name - Date Created - AWS Region
* [ ] Create New Bucket
* [ ] Get Files/Folders
* [ ] Add Folder
* [ ] Add File(s)
* [ ] Delete Files
* [ ] Get/Subscribe to Loading Percentage
* [ ] Send Email
<hr />

#### To run:
* `$ cd src` `npm start`
* `$ backend` `nodemon server` or `node server`

In the backend folder place your aws credentials into a `.env` file.
The credentials will look like:
```
AWS_ACCESS_KEY_ID=ABCDEFGHIJ123456789
AWS_SECRET_ACCESS_KEY=O12ABC3456DEFGHIJKLMNOPQRXTUVWX987654321 
AWS_REGION=us-east-1
``` 
Access via:
http://192.168.1.152:8080

<hr />

##### Stack:
* React
* Redux
* Axios
* Expressjs
* AWS S3 Client V3 - `@aws-sdk/client-s3`
* Jest/Enzyme
* Adobe XD
