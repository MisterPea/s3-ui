import * as React from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import PropTypes from 'prop-types';
import BucketLI from './BucketLI';

export default function BucketUL({ buckets, loading }) {
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

  return (
    <AnimateSharedLayout>
      <motion.ul
        layout
        variants={parentVariant}
        animate={loading ? 'open' : 'closed'}
        initial="closed"
      >
        {buckets.map((bucket) => (
          <BucketLI
            key={bucket.Name}
            bucket={bucket}
          />
        ))}
      </motion.ul>
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
};
