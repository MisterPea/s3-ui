import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoTrashSharp } from 'react-icons/io5';
import BucketLogo from './graphic_elements/BucketLogo';

export default function BucketLI({ bucket }) {
  const { Name, Region, CreationDate } = bucket;
  const addedVariant = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      y: -2,
    },
  };

  return (
    <motion.li layout variants={addedVariant} className="bucket-li">
      <div className="bucket-row">
        <div className="bucket-row-left">
          <Link to={`/S3/?id=${Name}&loc=${Region}`}>
            <div className="bucket-row-wrapper">
              <div className="bucket-icon-wrapper">
                <div className="bucket-icon">
                  <BucketLogo />
                </div>
              </div>
              <p className="bucket-name">{Name}</p>
              <p className="bucket-table-data date">{CreationDate}</p>
              <p className="bucket-table-data region">{Region}</p>
            </div>
          </Link>
        </div>
        <IoTrashSharp className="bucket-row-right" />
      </div>
    </motion.li>
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
