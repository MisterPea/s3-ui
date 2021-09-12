import { useLocation } from 'react-router';

/**
 * This method take no arguments and returns an object of query string key: value pairs.
 * Works only for ampersand separated pairs:
 *
 * `?id=1.newBucket&loc=us-east-1` will return:
 *
 * `{id: 1.newBucket,
 *  loc: us-east-1}`
 * @return {Object} Returns object of query key: value pairs
 *
 * ** Note: Requires react-router **
 */
export default function useParseQuery() {
  const location = useLocation().search;
  const output = {};
  let key = '';
  let currentSlice = '';
  for (let i = 0; i < location.length; i += 1) {
    const temp = location[i];
    if (temp !== '?' && temp !== '=' && temp !== '&') {
      currentSlice += temp;
    }
    if (temp === '=') {
      key = currentSlice;
      output[key] = '';
      currentSlice = '';
    }
    if (temp === '&') {
      output[key] = currentSlice;
      currentSlice = '';
      key = '';
    }
    if (i === location.length - 1) {
      output[key] = currentSlice;
      currentSlice = '';
      key = '';
    }
  }
  return output;
}
