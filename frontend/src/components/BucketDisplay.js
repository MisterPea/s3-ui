import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAddCircleSharp } from 'react-icons/io5';
import LoadingBar from './graphic_elements/LoadingBar';
import { getBucketList } from '../redux/actions/bucket';
import ModalComponentWrapper from './ModalComponentWrapper';
import AddBucketModal from './AddBucketModal';
import BucketUL from './BucketUL';
import useScrollIntersect from './helpers/useScrollIntersect';

export default function BucketDisplay() {
  const { loading, buckets } = useSelector((state) => state);
  const [addBucketModal, setAddBucketModal] = useState(false);
  const [[scrollTarget], setScrollTarget] = useState([null]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBucketList());
  }, []);

  const [
    topScrollShadow,
    bottomScrollShadow,
    handleScroll] = useScrollIntersect(buckets, scrollTarget);

  function handleToggleModal() {
    setAddBucketModal((s) => !s);
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleToggleModal();
    }
  }

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

  const bucketVariant = {
    open: {
      opacity: 1,
      transition: {
        ease: 'easeIn',

      },
    },
    closed: {
      opacity: 0,
      transition: {
        // delay: 0.5,
      },
    },
  };

  return (
    <div className="bucket-display-wrapper">
      <div className="bucket-header-wrapper">
        <div className={`bucket-display ${topScrollShadow ? 'overflow' : ''}`}>
          <h3 className="bucket-name-header">Bucket Name</h3>
          <h3 className="bucket-date-header">Creation Date</h3>
          <h3 className="bucket-region-header">AWS Region</h3>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {loading && (
          <motion.div key="loadingBar" variants={loaderVariant} exit="exit">
            <LoadingBar key="loadingBar" />
          </motion.div>
        )}
        <motion.div
          onScroll={(e) => handleScroll(e)}
          className="ul-wrapper"
          key="bucketUL"
          variants={bucketVariant}
          animate="open"
          initial="closed"
          exit="closed"
        >
          <BucketUL buckets={buckets} loading={!loading} onFinish={setScrollTarget} />
        </motion.div>
      </AnimatePresence>

      <div
        onClick={handleToggleModal}
        onKeyPress={(e) => handleKeyPress(e)}
        role="button"
        tabIndex={0}
        className={`add-bucket-bar${bottomScrollShadow ? ' overflow' : ''}`}
      >
        <span className="bucket-button-elements">
          <div className="bucket-cta-wrapper">
            <h3>Create New S3 Bucket</h3>
            <IoAddCircleSharp className="add-bucket-plus" />
          </div>
        </span>
      </div>

      {addBucketModal
        && (
        <ModalComponentWrapper close={handleToggleModal}>
          <AddBucketModal />
        </ModalComponentWrapper>
        )}
    </div>
  );
}
