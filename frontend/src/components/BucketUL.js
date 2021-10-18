import * as React from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import PropTypes from 'prop-types';
import BucketLI from './BucketLI';

function EmptyS3() {
  return (
    <><motion.p className="empty-s3">Looks like there's nothing here</motion.p></>
  );
}

/**
 * Wrapper component that renders list item the component(s).
 * @prop {Object[]} buckets Array of S3 object/buckets
 * @prop {Bool} loading Whether the loading of buckets is active (true) or not (false)
 * @prop {func} onFinish Callback function that is called on the completion of the list animation
 * @return {JSX} Return a JSX component
 */
export default function BucketUL({ buckets, loading, onFinish }) {
  function handleComplete() {
    onFinish(document.getElementsByClassName('ul-wrapper'));
  }

  const parentVariant = {
    open: {
      height: '100%',
      transition: {
        ease: 'easeOut',
        staggerChildren: 0.03,
      },
    },
    closed: {
      height: '0',
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: 'easeIn',
        when: 'afterChildren',
      },
    },
  };

  // having rendering being dictated by `loading` might not be the best solution for render blocking

  return (
    <AnimateSharedLayout>
      {loading && (
        buckets.length === 0 ? <EmptyS3 /> : (
          <motion.ul
            className="bucket-ul-inner"
            key="bucketULInner"
            layout
            variants={parentVariant}
            animate={loading ? 'open' : 'closed'}
            initial="closed"
          // eslint-disable-next-line no-unused-vars
            onAnimationComplete={(height) => handleComplete()}
          >
            {buckets && buckets.map((bucket) => (
              <BucketLI
                key={bucket.Name}
                bucket={bucket}
              />
            ))}
          </motion.ul>
        )
      )}
    </AnimateSharedLayout>
  );
}

BucketUL.defaultProps = {
  buckets: [],
  loading: true,
};

BucketUL.propTypes = {
  buckets: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onFinish: PropTypes.func.isRequired,
};
