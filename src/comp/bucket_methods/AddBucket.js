import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

/**
 * Component to create a new S3 bucket
 * @param {String[]} bucketList Array of strings containing current buckets
 * @return {JSX} Returns a AddBucket component
 */
export default function AddBucket({ bucketList }) {
  const [bucketName, setBucketName] = useState('');
  const [inputOpen, setInputOpen] = useState(false);

  const boxStyle = {
    marginTop: '20px',
    // height: '200px',
    width: '500px',
    backgroundColor: '#E6E6E6',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontSize: '12px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleOpenClick = (e) => {
    e.target.nodeName === 'DIV' && setInputOpen(!inputOpen);
  };

  const handleChange = (e) => {
    setBucketName(e.target.value);
  };

  const handleSubmitBucket = () => {
    if (isUniqueBucket(bucketName)) {
      axios({
        method: 'POST',
        url: 'http://192.168.1.152:3200/addBucket',
        data: JSON.stringify({ bucket: bucketName }),
        headers: {
          'content-type': 'application/json',
        },
      }).then((res) => {
        console.log('Add bucket:', res);
      }).catch((err) => console.error('Add bucket error:', err));
    }
  };

  const isUniqueBucket = (bucket) => {
    return !bucketList.includes(bucket);
  };

  const inputName = () => {
    return (
      <div>
        <input
          type='text'
          onChange={(e) => handleChange(e)}
          value={bucketName}
        />
        <button
          onClick={handleSubmitBucket}
        >Submit</button>
      </div>
    );
  };

  return (
    <div
      className='list-item'
      style={boxStyle}
      onClick={(e) => handleOpenClick(e)}>
      Add Bucket
      {inputOpen && inputName()}
    </div>
  );
}
AddBucket.propTypes = {
  bucketList: propTypes.array,
};
