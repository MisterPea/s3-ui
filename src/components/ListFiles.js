import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/**
 * Method to retrieve the region of a bucket
 * @param {string} bucketName Name of bucket to retrieve region of
 * @return {Promise} Will resolve to either a region string or undefined
 */
export function getBucketRegion(bucketName) {
  return axios({
    method: 'POST',
    url: 'http://192.168.1.152:3200/getBucketRegion',
    data: JSON.stringify({ bucket: bucketName }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.error(`There was a problem retrieving the region: ${err}`);
  });
};

/**
 * Method to retrieve contents of an S3 bucket
 * @param {string} bucketName name of bucket to retrieve contents from
 * @param {string} region region/location of S3 bucket
 * @return {JSX} Component containing list of files in bucket
 */
export function ListFiles({ bucketName, region, callback }) {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    retrieveFolderContents(bucketName);
  }, []);

  const retrieveFolderContents = (bucketName) => {
    axios({
      method: 'POST',
      url: 'http://192.168.1.152:3200/listBucketContents',
      data: JSON.stringify({ bucket: bucketName, region: region }),
      headers: {
        'content-type': 'application/json',
      },
    })
        .then((res) => {
          // console.log(res)
          setFileList(res.data.Contents === undefined ?
            [`You don't have any objects in this bucket.`] :
            res.data.Contents);
        })
        .catch((err) => console.error(`Error retrieving contents: ${err}`));
  };

  return (
    <div>
      <button onClick={callback}>Close</button>
      <ul>
        {fileList.map(({ Key, Size }, index) => (
          <li key={index}>
            <p>{Key}<span>{Size}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListFiles.propTypes = {
  bucketName: PropTypes.string,
  region: PropTypes.string,
  callback: PropTypes.func,
};
