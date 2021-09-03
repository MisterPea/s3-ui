import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAddCircleSharp } from 'react-icons/io5';
import LoadingBar from './graphic_elements/LoadingBar';
import { getBucketList, addNewBucketToList } from '../redux/actions/bucket';
import CreateBucketModal from './Modal_AddBucket';
import BucketUL from './BucketUL';

export default function BucketDisplay() {
  const { loading, buckets } = useSelector((state) => state);
  const [addBucketModal, setAddBucketModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBucketList());
  }, []);

  const loaderVariant = {
    exit: {
      opacity: 0,
      transition: {
        ease: 'circOut',
        when: 'beforeChildren',
        duration: 0.3,
      },
    },
  };

  function addBucket(nameAndRegion) {
    const { name, region } = nameAndRegion;
    const newBucket = {
      Name: name,
      Region: region,
      CreationDate: new Date().toISOString(),
    };
    dispatch(addNewBucketToList(newBucket));
  }

  function handleToggleModal() {
    if (addBucketModal === false) {
      const body = document.querySelector('body');
      const modal = document.createElement('DIV');
      const root = document.getElementById('root');
      modal.id = 'modal-mount';
      body.insertBefore(modal, root);
    } else {
      const modal = document.getElementById('modal-mount');
      modal.remove();
    }
    setAddBucketModal((state) => !state);
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleToggleModal();
    }
  }

  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: '-100vw',
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="out"
      animate="in"
      exit="exit"
    >
      <div className="buckets-number">{`Buckets (${buckets ? buckets.length : '0'})`}</div>
      <div className="table-head bucket-display">
        <h3 className="name-header">Bucket Name</h3>
        <h3 className="date-header">Creation Date</h3>
        <h3 className="region-header">AWS Region</h3>
      </div>
      <AnimatePresence>
        {loading && (
          <motion.div key="abc" variants={loaderVariant} exit="exit">
            <LoadingBar key="loadingBar" />
          </motion.div>
        )}
        <BucketUL key="def" buckets={buckets} loading={!loading} />
      </AnimatePresence>

      <div
        onClick={handleToggleModal}
        onKeyPress={(e) => handleKeyPress(e)}
        role="button"
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
      {addBucketModal && <CreateBucketModal close={handleToggleModal} addBucket={addBucket} />}
    </motion.div>
  );
}
