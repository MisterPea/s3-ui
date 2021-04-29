import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { MultipartUpload } from './MultipartUpload';
import { ListFiles, getBucketRegion } from './bucket_methods/ListFiles';
import {BsBucket} from 'react-icons/bs';
import { makeCssValid } from './bucket_methods/frontendBucketMethods';
import '../style/main.scss';

/**
 * Drag and drop component
 * @param {String} label Label for area display
 * @return {JSX}
 */
export default function BucketMain({ label }) {
  const [viewContents, setViewContents] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const location = getBucketRegion(label);
    location.then((res) => {
      setRegion(res ? res : undefined);
    });
  }, []);

  const handleViewContents = (e) => {
    e.preventDefault();
    setViewContents(!viewContents);
  };

  return (
    <div className={`bucket-label-and-dropdown`}>
      <div
        data-region={region ? region : 'us-east-1'}
        className={`bucket-li ${makeCssValid(label)}`}
        onClick={handleViewContents}>
        <BsBucket className='bucket-icon'/>
        <div className='bucket-text md-text'>{label}</div>
      </div>
      {viewContents && <ListFiles
        bucketName={label}
        region={region} />}
    </div>
  );
};

BucketMain.propTypes = {
  label: PropTypes.string,
  sendFunction: PropTypes.func,
};
