import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { validateBucketName } from './helpers/validation';
import { addNewBucketToList } from '../redux/actions/bucket';

/**
 * Content to be wrapped by ModalComponentWrapper - Initiates the creation of a new S3 bucket.
 * @param {func<bool>} setModalOpen Passed in from `ModalComponentWrapper`- controls the
 * removal of the `ModalComponentWrapper` from the DOM.
 * @returns {JSX}
 */
export default function AddBucketModal({ setModalOpen }) {
  const [inputValue, setInputValue] = useState({ name: '', region: 'us-east-1' });
  const [validEntry, setValidEntry] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('bucket-text-input').focus();
  }, []);

  useEffect(() => {
    if (validateBucketName(inputValue.name)) {
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
      return setInputValue((v) => ({ ...v, name: value }));
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
      <h1>Create Bucket</h1>
      <input
        id="bucket-text-input"
        autoComplete="off"
        type="text"
        placeholder="Enter new bucket name"
        tabIndex={0}
        value={inputValue.name}
        onChange={(e) => handleInputChange(e)}
        style={{ textTransform: 'lowercase' }}
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
      <ul className="modal-instructions">
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
  );
}

AddBucketModal.defaultProps = {
  setModalOpen: null,
};

AddBucketModal.propTypes = {
  setModalOpen: PropTypes.func,
};
