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
* [x] Get List of Buckets - Name - Date Created - AWS Region
* [x] Create New Bucket
* [x] Delete Buckets
* [ ] Error catching - Bucket Creation
* [x] Get Files/Folders
* [x] Framer Motion integration
* [x] Add Folder
* [x] Delete Folder
* [ ] Error catching - Folder Creation
* [ ] Add File(s)
* [ ] Error catching - File Upload
* [ ] Delete Files
* [ ] Error catching - File Deletion
* [ ] Get/Subscribe to Loading Percentage
* [ ] Send Email
* [x] Mobile Layout
* [ ] Tablet Layout
* [ ] Desktop Layout
<hr />

#### To run:
* `$ cd frontend` `npm start`
* `$ cd backend` `nodemon server` or `node server`
* To start aws development server `localstack start`

In the backend folder place your aws credentials into a `.env` file.
The credentials will look like:
```
AWS_ACCESS_KEY_ID=ABCDEFGHIJ123456789
AWS_SECRET_ACCESS_KEY=O12ABC3456DEFGHIJKLMNOPQRXTUVWX987654321 
AWS_REGION=us-east-1
``` 
<hr />

#### localStack CLI intergration:
Your actual S3 buckets can be cloned and populated into your localStack mock with [this script.](https://github.com/MisterPea/S3-Uploader/blob/d03793e7afabbc8ad6cc0580a94cbafae822fda2/shell%20scripts/CloneS3ToLocalstack.sh)

Command line usage - s3:
`aws s3 ls --endpoint-url http://localhost:4566 s3://myS3Bucket`

Command line usage - s3api: 
`aws s3api put-object --endpoint-url http://localhost:4566 --bucket myS3Bucket --key folder_one/`

AWS S3 CLI Reference: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#cli-aws-s3

AWS S3api CLI Reference: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html

##### Stack:
* React
* Redux
* Axios
* Expressjs
* AWS S3 Client V3 - `@aws-sdk/client-s3`
* localStack
* Jest/Enzyme
* Adobe XD
