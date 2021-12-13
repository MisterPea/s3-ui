import * as React from 'react';
import propTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function ProgressBar({ percentage }) {
  return (
    <div className="progress-wrapper">
      <motion.div
        key="progress-motion-bar"
        className="progress-bar-top"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}

      />
      <div className="progress-bar-back" />
    </div>
  );
}

ProgressBar.propTypes = {
  percentage: propTypes.number.isRequired,
};
