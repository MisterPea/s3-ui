import axios from 'axios';
import {
  errorGettingBucketContents,
  errorGettingBuckets,
  errorCreatingBucket,
  errorDeletingBucket,
} from './error';
import { showLoader, hideLoader } from './loading';

export const GET_BUCKETS = 'GET_BUCKETS';
export const CREATE_BUCKET = 'CREATE_BUCKET';
export const DELETE_BUCKET = 'DELETE_BUCKET';
export const GET_BUCKET_CONTENTS = 'GET_BUCKET_CONTENTS';
export const GET_BUCKETS_AND_CONTENTS = 'GET_BUCKETS_AND_CONTENTS';

const { hostname } = window.location;

function getBuckets(buckets) {
  return {
    type: GET_BUCKETS,
    buckets,
  };
}

function getBucketContents(bucket, contents) {
  return {
    type: GET_BUCKET_CONTENTS,
    bucket,
    contents,
  };
}

function getBucketsAndContents(buckets) {
  return {
    type: GET_BUCKETS_AND_CONTENTS,
    buckets,
  };
}

function addBucket(newBucket) {
  const { Name, Region, CreationDate } = newBucket;
  return {
    type: CREATE_BUCKET,
    bucket: {
      Name,
      Region,
      CreationDate,
    },
  };
}

function deleteBucket(bucket) {
  return {
    type: DELETE_BUCKET,
    bucket,
  };
}

export function getBucketList() {
  return (dispatch) => {
    dispatch(showLoader());
    axios({
      method: 'GET',
      url: `http://${hostname}/api/getBucketList`,
    }).then(({ data }) => {
      dispatch(hideLoader());
      dispatch(getBuckets(data));
    }).catch(() => dispatch(errorGettingBuckets()));
  };
}

export function getBucketContentsList(region, bucket) {
  return (dispatch) => {
    dispatch(showLoader());
    axios({
      method: 'POST',
      url: `http://${hostname}/api/getBucketContents`,
      data: JSON.stringify({ locale: region, bucket }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(({ data }) => {
      dispatch(getBucketContents(bucket, data));
      dispatch(hideLoader());
    }).catch(() => {
      dispatch(errorGettingBucketContents());
      dispatch(hideLoader());
    });
  };
}

export function getBucketsAndContentsList(region, bucket) {
  return (dispatch) => {
    dispatch(showLoader());
    axios({
      method: 'POST',
      url: `http://${hostname}/api/getBucketsAndContents`,
      data: JSON.stringify({ locale: region, bucket }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(({ data }) => {
      dispatch(getBucketsAndContents(data));
      dispatch(hideLoader());
    }).catch(() => {
      dispatch(errorGettingBucketContents());
      dispatch(hideLoader());
    });
  };
}

export function addNewBucketToList(newBucket) {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `http://${hostname}/api/createBucket`,
      data: JSON.stringify({ locale: newBucket.Region, bucket: newBucket.Name }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(addBucket(newBucket)))
      .catch(() => dispatch(errorCreatingBucket()));
  };
}

export function deleteBucketFromList(region, bucket) {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `http://${hostname}/api/deleteBucket`,
      data: JSON.stringify({ locale: region, bucket }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => dispatch(deleteBucket(bucket)))
      .catch(() => dispatch(errorDeletingBucket()));
  };
}
