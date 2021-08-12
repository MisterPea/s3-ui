import axios from 'axios';

export const GET_BUCKETS = 'GET_BUCKETS';
export const CREATE_BUCKET = 'CREATE_BUCKET';
export const DELETE_BUCKET = 'DELETE_BUCKET';
export const GET_BUCKET_CONTENTS = 'GET_BUCKET_CONTENTS';

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
    bucket: {
      bucket,
      contents,
    },
  };
}

export function getBucketList() {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://${hostname}:3200/getBucketList`,
    }).then(({ data }) => {
      dispatch(getBuckets(data));
    });
  };
}

export function getBucketContentsList(region, bucket) {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `http://${hostname}:3200/getBucketContents`,
      data: JSON.stringify({ locale: region, bucket }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((contents) => {
      dispatch(getBucketContents(bucket, contents));
    });
  };
}
