import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BucketLogo from './graphic_elements/BucketLogo';

export default function BucketLI({ bucket }) {
  const { Name, Region, CreationDate } = bucket;
  const addedVariant = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
      },
    },
    closed: {
      opacity: 0,
      y: -2,
    },
  };

  return (
    <Link to={`/S3/?id=${Name}&loc=${Region}`}>
      <motion.li layout variants={addedVariant} className="bucket-row">
        <div className="bucket-table-data name">
          <div className="bucket-logo"><BucketLogo /></div>
          <p className="bucket-name">{Name}</p>
        </div>
        <p className="bucket-table-data date">{CreationDate}</p>
        <p className="bucket-table-data region">{Region}</p>
      </motion.li>
    </Link>
  );
}

BucketLI.defaultProps = {
  bucket: {},
};

BucketLI.propTypes = {
  bucket: PropTypes.shape({
    Name: PropTypes.string,
    Region: PropTypes.string,
    CreationDate: PropTypes.string,
  }),
};
