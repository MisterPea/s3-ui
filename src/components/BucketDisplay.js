import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import BucketLogo from './BucketLogo';
import { getBucketList, addNewBucketToList } from '../redux/actions/bucket';
import CreateBucketModal from './Modal-createBucket';

/**
 * Component to render bucket and info
 * @return {JSX}
 */
export default function BucketDisplay() {
  const buckets = useSelector((state) => state.buckets);
  const dispatch = useDispatch();
  const [addBuckedModal, setAddBucketModal] = useState(false);

  useEffect(() => {
    dispatch(getBucketList());
  }, [dispatch]);

  function handleToggleModal() {
    setAddBucketModal(!addBuckedModal);
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') handleToggleModal();
  }

  function addBucket(name) {
    dispatch(addNewBucketToList(name))
  }

  return (
    <>
      <div className="buckets-number">{`Buckets (${buckets.length})`}</div>
      <div className="table-head bucket-display">
        <h3 className="name-header">Bucket Name</h3>
        <h3 className="date-header">Creation Date</h3>
        <h3 className="region-header">AWS Region</h3>
      </div>

      <ul>
        {buckets.map(({ Name, CreationDate, Region }) => (
          <li key={Name}>
            <Link to={`/S3/?id=${Name}&loc=${Region}`}>
              <div
                className="bucket-row"
                role="button"
                tabIndex={0}
              >
                <div className="bucket-table-data name">
                  <div className="bucket-logo"><BucketLogo /></div>
                  <p className="bucket-name">{Name}</p>
                </div>
                <p className="bucket-table-data date">{CreationDate}</p>
                <p className="bucket-table-data region">{Region}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div
        role="button"
        onClick={handleToggleModal}
        onKeyPress={(e) => handleKeyPress(e)}
        tabIndex={0}
        className="add-bucket-bar"
      >
        <span className="bucket-button-elements">
          <div className="bucket-cta-wrapper">
            <h3>Create New S3 Bucket</h3>
            <IoAddCircleSharp className="add-bucket-plus" />
          </div>
        </span>
      </div>
      {addBuckedModal && (
      <CreateBucketModal
        close={handleToggleModal}
        addBucket={addBucket}
      />
      )}
    </>
  );
}
