import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IoTrashSharp } from 'react-icons/io5';
import { deleteBucketFromList } from '../redux/actions/bucket';
import { errorGettingFolderInfo } from '../redux/actions/error';
import ModalHeader from './ModalHeader';
import SubmitButton from './SubmitButton';

export default function BucketDeleteModal({ Name, Region, setModalOpen }) {
  const [isDeletable, setIsDeletable] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    isDeletionAvailable(Region, Name);
  }, []);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Enter' && !isDeletable) {
        setModalOpen();
      }
    };
    document.addEventListener('keypress', closeModal);
    return () => {
      document.removeEventListener('keypress', closeModal);
    };
  }, [isDeletable]);

  /**
 * Method that retrieves the number of of objects in the bucket and sets the `isDeletable` state
 * to false if there are any (n > 0) objects, otherwise it sets it to true,
 * thus allowing the deletion to proceed.
 * @param {string} Region The region the bucket resides
 * @param {string} Name The name of the bucket
 * @param {function} isDeletableCallback Callback, reference to the `setIsDeletable` set-state
 */
  function isDeletionAvailable() {
    
    axios({
      method: 'POST',
      url: `${SSL}${HOSTNAME}/api/getBucketObjectsLength`,
      data: JSON.stringify({ locale: Region, bucket: Name }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(({ data }) => {
      if (data.objectLength === 0) {
        return setIsDeletable(true);
      }
      return setIsDeletable(false);
    }).catch(() => dispatch(errorGettingFolderInfo()));
  }

  /**
 * Method invoked if the bucket is empty and is abel to be deleted
 * @return {JSX} Returns a JSX component
 */
  function DeletionAvailable() {
    const [validInput, setValidInput] = useState(false);
    const [confirmInput, setConfirmInput] = useState('');

    function handleInputChange(e) {
      setConfirmInput(e.target.value);
    }

    if (confirmInput === 'Permanently Delete') {
      if (!validInput) {
        setValidInput(true);
      }
    } else if (validInput) {
      setValidInput(false);
    }

    function handleDeletionCall() {
      dispatch(deleteBucketFromList(Region, Name));
      setModalOpen();
    }

    return (
      <>
        <p className="confirm-message">
          To confirm deletion, type
          <span className="confirm-folder"> Permanently Delete </span>
          in the text input field.
        </p>
        <input
          className="confirm-input"
          placeholder="Permanently Delete"
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={confirmInput}
        />
        <SubmitButton
          text="Delete Bucket"
          isDisabled={!validInput}
          clickHandle={handleDeletionCall}
          destructive
        />
      </>
    );
  }

  /**
 * Method invoked if the bucket is not empty
 * @return {JSX} Returns a JSX component
 */
  function DeletionUnavailable() {
    return (
      <>
        <p className="confirm-message">
          Unable to delete bucket. Please erase its contents before deleting.
        </p>
        <SubmitButton text="Close" clickHandle={setModalOpen} longer />
      </>
    );
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-button-group">
        <ModalHeader Icon={IoTrashSharp} iconColor="red" text="Delete Bucket" rule />
      </div>
      {isDeletable ? <DeletionAvailable /> : <DeletionUnavailable />}
    </div>
  );
}

BucketDeleteModal.propTypes = {
  Name: PropTypes.string.isRequired,
  Region: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  setModalOpen: PropTypes.func,
};
