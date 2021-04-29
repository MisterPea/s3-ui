import axios from 'axios';

/**
 * Method to get all the S3 buckets of an account
 * @return {Promise} Promise containing Key and CreationDate of Bucket
 */
export function getBucketList() {
  return axios({
    method: 'GET',
    url: 'http://192.168.1.152:3200/bucketList',
  })
      .then(({data}) => {
        return data;
      });
};

/**
 * Method to check and for and remove periods(.) from class strings
 * @param {String} classString String of the className to check
 * @return {String} Returns a string of the sanitized string
 */
export function makeCssValid(classString) {
  return classString.split('.').join('-');
};
