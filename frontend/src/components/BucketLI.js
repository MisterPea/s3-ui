import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCloudOutline } from 'react-icons/io5';
import { FiTrash } from 'react-icons/fi';
import ModalComponentWrapper from './ModalComponentWrapper';
import BucketDeleteModal from './BucketDeleteModal';
import utcFormat from './helpers/utcFormat';

export default function BucketLI({ bucket }) {
  const { Name, Region, CreationDate } = bucket;
  const [modalOpen, setModalOpen] = useState(false);

  function handleDeleteBucket() {
    handleDeleteModalToggle();
  }

  function handleDeleteModalToggle() {
    setModalOpen((s) => !s);
  }

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
    <>
      <motion.li layout variants={addedVariant} className="bucket-li">
        <div className="bucket-row">
          <div className="bucket-row-left">
            <Link to={`/S3/?id=${Name}&loc=${Region}`}>
              <div className="bucket-row-wrapper">
                <div className="bucket-icon-wrapper">
                  <div className="bucket-icon">
                    <IoCloudOutline />
                  </div>
                </div>
                <p className="bucket-name name">{Name}</p>
                <p className="bucket-table-data date">{utcFormat(CreationDate)}</p>
                <p className="bucket-table-data region">{Region}</p>
              </div>
            </Link>
          </div>
          <div className="bucket-row-right">
            <FiTrash
              title={`Delete ${Name} bucket`}
              onClick={handleDeleteBucket}
              role="button"
            />
          </div>
        </div>
      </motion.li>
      { modalOpen
      && (
      <ModalComponentWrapper close={handleDeleteModalToggle}>
        <BucketDeleteModal Name={Name} Region={Region} />
      </ModalComponentWrapper>
      )}
    </>
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
