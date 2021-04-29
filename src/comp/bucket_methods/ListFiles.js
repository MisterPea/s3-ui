import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {CreateJSXTree} from './CreateJSXTree';

/**
 * Method to retrieve the region of a bucket
 * @param {String} bucketName Name of bucket to retrieve region of
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
 * @param {String} bucketName name of bucket to retrieve contents from
 * @param {String} region region/location of S3 bucket
 * @return {JSX} Component containing list of files in bucket
 */
export function ListFiles({ bucketName, region }) {
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
          setFileList(res.data);
        })
        .catch((err) => console.error(`Error retrieving contents: ${err}`));
  };

  // setFileList is passed to CreateJSXTree so DragDrop will have access to it.

  return (
    <ul className='jsx-tree-ul'>
      <CreateJSXTree
        region={region ? region : 'us-east-1'}
        bucket={bucketName}
        data={fileList}
        setState={setFileList}/>
    </ul>
  );
}

ListFiles.propTypes = {
  bucketName: PropTypes.string,
  region: PropTypes.string,
};

