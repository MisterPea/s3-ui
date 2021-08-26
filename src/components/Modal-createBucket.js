import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { validateBucketName } from './helpers/validation';

export default function CreateBucketModal({ close, addBucket }) {
  const elementRoot = useRef(document.getElementById('modal-root'));
  const [inputValue, setInputValue] = useState('');
  const [validEntry, setValidEntry] = useState(false);

  useEffect(() => {
    if (validateBucketName(inputValue)) {
      if (!validEntry) setValidEntry(true);
    } else if (validEntry) setValidEntry(false);
  }, [inputValue]);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  function handleInputChange(e) {
    setInputValue(e.target.value.toLowerCase());
  }

  function handleAddBucket() {
    addBucket(inputValue);
    // console.log('handler', inputValue)
    // addBucket(inputValue);
  }

  const jsxT = (
    <div className="modal-overlay">
      <div className="modal-center">
        <IoIosClose onClick={() => close()} tabIndex={0} className="modal-close-button" />
        <div className="modal-wrapper">

          <h1>Create Bucket</h1>
          <input
            type="text"
            placeholder="Enter bucket name"
            tabIndex={0}
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <ul>
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
      </div>
    </div>
  );
  return (
    createPortal(
      jsxT, elementRoot.current,
    )
  );
}
