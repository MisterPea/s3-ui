const express = require('express');

const app = express();
const PORT = 3200;
const cors = require('cors');
const routes = require('./routes');

function errorHandler(err, req, res) {
  return res.status(404).json(err);
}

app.use(cors());
app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Connection running on Port: ${PORT}`));

// getAllBuckets().then((a) => console.log(a));
// createBucket('1.newBucket');
// emptyBucket('us-east-1', 'pork-pie-hat');/
// getBucketContents('us-east-1', 'pork-pie-hat').then((a) => console.log(a))
// addFolder('us-east-1', 'scoop', 'pork-pie-hat')
// deleteBucketContents('pork-pie-hat', 'us-east-1', [{Key: 'scoop/'}]);
// deleteBucket('us-east-1', 'pork-pie-hat')
//     .then((a) => console.log(a)).catch((c) => console.log(c))
// deleteBucketContents('1.newbucket', 'us-east-1', [{Key: 'README.md'}])
//     .then((a) => console.log(a)).catch((c) => console.log(c))
// [
//   {
//     Name: '1.newbucket',
//     Region: 'us-east-1',
//     CreationDate: 2021-06-15T15:50:10.000Z
//   },
//   {
//     Name: 'cf-templates-1rrngkxo9ne14-us-east-1',
//     Region: 'us-east-1',
//     CreationDate: 2020-08-11T00:22:08.000Z
//   },
//   {
//     Name: 'elasticbeanstalk-us-east-1-897278278762',
//     Region: 'us-east-1',
//     CreationDate: 2020-08-13T18:36:57.000Z
//   },
//   {
//     Name: 'logs.misterpea.me',
//     Region: 'us-east-2',
//     CreationDate: 2020-02-23T21:01:23.000Z
//   },
//   {
//     Name: 'misterpea.me',
//     Region: 'us-east-2',
//     CreationDate: 2020-02-23T19:57:48.000Z
//   },
//   {
//     Name: 'misterpea.me-emails',
//     Region: 'us-east-1',
//     CreationDate: 2021-01-25T03:06:10.000Z
//   },
//   {
//     Name: 'new-ass-bucket',
//     Region: 'us-east-1',
//     CreationDate: 2021-04-15T13:48:06.000Z
//   },
//   {
//     Name: 'pork-pie-hat',
//     Region: 'us-east-1',
//     CreationDate: 2021-03-23T02:10:35.000Z
//   },
//   {
//     Name: 'topstories.misterpea.me',
//     Region: 'us-east-2',
//     CreationDate: 2020-04-09T22:56:59.000Z
//   },
//   {
//     Name: 'www.misterpea.me',
//     Region: 'us-east-2',
//     CreationDate: 2020-02-23T19:59:01.000Z
//   }
// ]
