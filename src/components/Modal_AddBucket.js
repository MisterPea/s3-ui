import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import { validateBucketName } from './helpers/validation';

export default function CreateBucketModal({ close, addBucket }) {
  const elementRoot = useRef(document.getElementById('modal-mount'));
  const [inputValue, setInputValue] = useState({ name: '', region: 'us-east-1' });
  const [validEntry, setValidEntry] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    if (validateBucketName(inputValue.name)) {
      if (!validEntry) setValidEntry(true);
    } else if (validEntry) setValidEntry(false);
  }, [inputValue]);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.getElementById('bucket-text-input').focus();
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  function handleInputChange(e) {
    const { value } = e.target;
    if (e.target.type === 'text') {
      return setInputValue((v) => ({ ...v, name: value }));
    }
    return setInputValue((v) => ({ ...v, region: value }));
  }

  function handleAddBucket() {
    addBucket(inputValue);
    setModalOpen(false);
  }

  function handleModalCloseSequence() {
    close();
  }

  const awsRegions = [
    { 'US East (N. Virginia)': 'us-east-1' },
    { 'US East (Ohio)': 'us-east-2' },
    { 'US West (N. California)': 'us-west-1' },
    { 'US West (Oregon)': 'us-west-2' },
    { 'Canada (Central)': 'ca-central-1' },
    { 'Europe (Frankfurt)': 'eu-central-1' },
    { 'Europe (Stockholm)': 'eu-north-1' },
    { 'Europe (Milan)': 'eu-south-1' },
    { 'Europe (Ireland)': 'eu-west-1' },
    { 'Europe (London)': 'eu-west-2' },
    { 'Europe (Paris)': 'eu-west-3' },
  ];

  const modalBackOverlay = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: 0.3,
      },
    },
  };

  const modalCenterVariant = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'tween',
        duration: 0.2,
        delay: 0.2,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.7,
      transition: {
        duration: 0.3,
      },
    },
    init: {
      opacity: 0,
      y: 100,
      scale: 0.7,
      transition: {
        duration: 0.3,
      },
    },
  };

  const portalJSX = (
    <motion.div
      variants={modalBackOverlay}
      initial="closed"
      animate={modalOpen ? 'open' : 'closed'}
      className="modal-overlay"
      // eslint-disable-next-line no-unused-vars
      onAnimationComplete={(opacity) => !modalOpen && handleModalCloseSequence()}
    >
      <motion.div
        className="modal-center"
        variants={modalCenterVariant}
        initial="init"
        animate={modalOpen ? 'open' : 'closed'}
      >
        <IoIosClose onClick={() => setModalOpen(false)} tabIndex={0} className="modal-close-button" />
        <div className="modal-wrapper">

          <h1>Create Bucket</h1>
          <input
            id="bucket-text-input"
            autoComplete="off"
            type="text"
            placeholder="Enter bucket name"
            tabIndex={0}
            value={inputValue.name}
            onChange={(e) => handleInputChange(e)}
          />
          <h2 className="region-select-header">Select Region</h2>
          <hr />
          <ul className="region-radio-ul">
            {awsRegions.map((item, index) => {
              const region = Object.keys(item);
              const tag = item[region];
              const isChecked = index === 0;
              return (
                <li
                  key={tag}
                  className="region-radio-li"
                >
                  <input
                    type="radio"
                    id={tag}
                    value={tag}
                    name="Region"
                    defaultChecked={isChecked}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <label htmlFor={tag}>{`${region} - ${tag}`}</label>
                </li>
              );
            })}
          </ul>
          <ul className="bucket-modal-instructions">
            <li>
              • Bucket name must be between 3 and 63
              characters long, and can consist only of
              lowercase letters, numbers,  dots (.), and hyphens (-).
            </li>
            <li>• Bucket name must begin and end with a letter or number.</li>
            <li>• Bucket name must not be formatted as an IP address.</li>
          </ul>
          <button
            tabIndex={0}
            className="bucket-submit"
            type="button"
            disabled={!validEntry}
            onClick={handleAddBucket}
          >
            Create Bucket
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
  return (
    createPortal(
      portalJSX, elementRoot.current,
    )
  );
}
