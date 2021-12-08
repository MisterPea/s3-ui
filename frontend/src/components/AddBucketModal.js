import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { BsBucket } from 'react-icons/bs';
import { validateBucketName } from './helpers/validation';
import { addNewBucketToList } from '../redux/actions/bucket';
import ModalHeader from './ModalHeader';
import SubmitButton from './SubmitButton';

/**
 * Content to be wrapped by ModalComponentWrapper - Initiates the creation of a new S3 bucket.
 * @prop {func<bool>} setModalOpen Passed in from `ModalComponentWrapper`- controls the
 * removal of the `ModalComponentWrapper` from the DOM.
 * @prop {string[]} currentBuckets Array of strings denoting current s3 buckets
 * @returns {JSX}
 */
export default function AddBucketModal({ setModalOpen, currentBuckets }) {
  const [inputValue, setInputValue] = useState({ name: '', region: 'us-east-1' });
  const [validEntry, setValidEntry] = useState(false);
  const dispatch = useDispatch();

  const handleEnterClick = useCallback((e) => {
    if (e.key === 'Enter' && validEntry) {
      handleAddBucket();
    }
  }, [validEntry, inputValue]);

  useEffect(() => {
    document.getElementById('bucket-text-input').focus();
    document.addEventListener('keydown', handleEnterClick);
    return () => {
      document.removeEventListener('keydown', handleEnterClick);
    };
  }, [validEntry, inputValue]);

  useEffect(() => {
    if (validateBucketName(inputValue.name, currentBuckets)) {
      if (!validEntry) setValidEntry(true);
    } else if (validEntry) setValidEntry(false);
  }, [inputValue]);

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

  function handleInputChange(e) {
    const { value } = e.target;
    if (e.target.type === 'text') {
      return setInputValue((v) => ({ ...v, name: value.toLowerCase() }));
    }
    return setInputValue((v) => ({ ...v, region: value }));
  }

  function handleAddBucket() {
    const { name, region } = inputValue;
    const newBucket = {
      Name: name,
      Region: region,
      CreationDate: new Date().toISOString(),
    };
    dispatch(addNewBucketToList(newBucket));
    setModalOpen(false);
  }

  return (
    <div className="modal-wrapper">
      <ModalHeader text="Create Bucket" Icon={BsBucket} />
      <input
        id="bucket-text-input"
        autoComplete="off"
        type="text"
        placeholder="Enter new bucket name"
        tabIndex={0}
        value={inputValue.name}
        onChange={(e) => handleInputChange(e)}
      />
      <h2 className="region-select-header">Select Region</h2>
      <hr className="add-bucket-rule" />
      <div className="radio-wrapper">
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
      </div>
      <ul className="modal-instructions">
        <li>
          • Bucket name must be between 3 and 63
          characters and can consist of letters, numbers,  dots (.), and hyphens (-).
          It cannot be formatted as an IP address.
        </li>
        <li>• Bucket name must begin and end with a letter or number.</li>
      </ul>
      <SubmitButton
        text="Create Bucket"
        clickHandle={handleAddBucket}
        isDisabled={!validEntry}
      />
    </div>
  );
}

AddBucketModal.defaultProps = {
  setModalOpen: null,
};

AddBucketModal.propTypes = {
  setModalOpen: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  currentBuckets: PropTypes.array.isRequired,
};
