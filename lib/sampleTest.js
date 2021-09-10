/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
// const { tree } = require('./utilities');

// const myTree = tree(contents);
// // myTree.map((element) => (
// //   element.name === 'img'
// //     ? element.children.map((e) => console.log(e))
// //     : null
// // ));
// const array = ['img', 'gallery', 'cover'];
// let currentChild = myTree;
// for (let i = 0; i < array.length; i += 1) {
//   currentChild.forEach((files) => {
//     if (files.name === array[i]) {
//       if (array.length - 1 === i) {
//         console.log(files.children);
//         console.log('*****', files.children.length, '******');
//       } else {
//         currentChild = files.children;
//       }
//     }
//   });
// }

// function draw() {
//   buckets.filter((bucket) => {
//     bucket.Name === 'misterpea.me' ? console.log(bucket.contents) : null;
//   });
// }
// draw();

const buckets = [
  { Name: '1.newbucket', Region: 'us-east-1', CreationDate: '2021-06-15T15:50:10.000Z' },
  { Name: 'cf-templates-1rrngkxo9ne14-us-east-1', Region: 'us-east-1', CreationDate: '2020-08-11T00:22:08.000Z' },
  { Name: 'elasticbeanstalk-us-east-1-897278278762', Region: 'us-east-1', CreationDate: '2020-08-13T18:36:57.000Z' },
  { Name: 'logs.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T21:01:23.000Z' },
  { Name: 'misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:57:48.000Z' },
  { Name: 'misterpea.me-emails', Region: 'us-east-1', CreationDate: '2021-01-25T03:06:10.000Z' },
  { Name: 'new-ass-bucket', Region: 'us-east-1', CreationDate: '2021-04-15T13:48:06.000Z' },
  { Name: 'pkdja', Region: 'us-east-1', CreationDate: '2021-08-30T16:45:39.000Z' },
  { Name: 'topstories.misterpea.me', Region: 'us-east-2', CreationDate: '2020-04-09T22:56:59.000Z' },
  { Name: 'www.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:59:01.000Z' }];

const prevBuckets = [
  { Name: '1.newbucket', Region: 'us-east-1', CreationDate: '2021-06-15T15:50:10.000Z' },
  { Name: 'cf-templates-1rrngkxo9ne14-us-east-1', Region: 'us-east-1', CreationDate: '2020-08-11T00:22:08.000Z' },
  { Name: 'elasticbeanstalk-us-east-1-897278278762', Region: 'us-east-1', CreationDate: '2020-08-13T18:36:57.000Z' },
  { Name: 'logs.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T21:01:23.000Z' },
  { Name: 'misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:57:48.000Z' },
  { Name: 'misterpea.me-emails', Region: 'us-east-1', CreationDate: '2021-01-25T03:06:10.000Z' },
  { Name: 'new-ass-bucket', Region: 'us-east-1', CreationDate: '2021-04-15T13:48:06.000Z' },
  { Name: 'topstories.misterpea.me', Region: 'us-east-2', CreationDate: '2020-04-09T22:56:59.000Z' },
  { Name: 'www.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:59:01.000Z' },
];

function diff() {
  // const d = bucket.filter((b) => !prev.find((e) => e.Name === b.Name));
  // const added = () => bucket.filter((b) => !prev.find((e) => e.Name === b.Name))[0];
  // const newArray = bucket.map((b) => added().Name === b.Name ? ({...b, insertion: true}) : b)
  // const newArray = bucket.map((b) => (
  //   added[0].Name === b.Name ? ({ ...b, insertion: true }) : ({ ...b, insertion: false })));
  // console.log(newArray);
  const prevLength = prevBuckets.length;
  let alteredArray = [];
  for (let i = 0; i < buckets.length; i += 1) {
    let prev;
    const bucket = buckets[i].Name;
    if (i < prevLength) {
      prev = prevBuckets[i].Name;
    } else if (i !== 0 && prevLength > 0) {
      prev = prevBuckets[i - 1].Name;
    }
    if (prev === bucket) {
      alteredArray.push(buckets[i]);
    } else {
      alteredArray.push({ ...buckets[i], insertion: true };
    }
  }
  return alteredArray;
}

console.log(diff());
