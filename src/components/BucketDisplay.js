import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import BucketLogo from './BucketLogo';
import { getBucketContentsList } from '../actions/bucket';

/**
 * Component to render bucket and info
 * @return {JSX}
 */
export default function BucketDisplay() {
  const buckets = useSelector((state) => state.buckets);
  const dispatch = useDispatch();
  function handleBucketClick(name, region) {
    dispatch(getBucketContentsList(region, name));
  }

  function onKeyDownHandler(e, name, region) {
    if (e.keyCode === 13) {
      handleBucketClick(name, region);
    }
  }

  return (
    <>
      <div className="table-head">
        <h3 className="name-header">Bucket Name</h3>
        <h3 className="date-header">Creation Date</h3>
        <h3 className="region-header">AWS Region</h3>
      </div>

      <ul>
        {buckets.map(({ Name, CreationDate, Region }) => (
          <li key={Name}>
            <div
              className="bucket-row"
              role="button"
              tabIndex={0}
              onClick={() => handleBucketClick(Name, Region)}
              onKeyDown={(e) => onKeyDownHandler(e, Name, Region)}
            >
              <div className="bucket-table-data name">
                <div className="bucket-logo"><BucketLogo /></div>
                <p className="bucket-name">{Name}</p>
              </div>
              <p className="bucket-table-data date">{CreationDate}</p>
              <p className="bucket-table-data region">{Region}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-bucket-bar">
        <span className="bucket-button-elements">
          <div className="bucket-cta-wrapper">
            <h3>Creat New S3 Bucket</h3>
            <IoAddCircleSharp className="add-bucket-plus" />
          </div>
        </span>
      </div>
    </>
  );
}
