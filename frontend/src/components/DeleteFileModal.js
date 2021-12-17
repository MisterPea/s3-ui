import * as React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import SubmitButton from './SubmitButton';
import { deleteFileFromList } from '../redux/actions/file';

export default function DeleteFileModal({
  name, setModalOpen, modalId, deleteFileInfo,
}) {
  const dispatch = useDispatch();
  const { locale, bucket, filePath } = deleteFileInfo;
  const key = `${(filePath && filePath.slice(1)) || ''}/${name}`;

  function handleDeleteConfirm() {
    document.getElementById(modalId).remove();
    dispatch(deleteFileFromList(locale, bucket, key));
  }

  return (
    <div className="delete-confirmation solo">
      <header className="confirm-delete-header">
        <FaExclamationTriangle />
        <h3>Are you sure?</h3>
        <hr className="modal-delete-rule" />
        <p>
          Deleting
          {' '}
          <span>{name}</span>
          {' '}
          cannot be undone.
        </p>
      </header>
      <div className="delete-modal-lower">
        <div className="delete-button-wrapper">
          <SubmitButton
            text="DELETE FILE"
            clickHandle={handleDeleteConfirm}
            destructive
            exactWidth="250px"
            exactHeight="50px"
          />
          <SubmitButton
            text="CANCEL"
            clickHandle={setModalOpen}
            exactWidth="250px"
            exactHeight="50px"
          />
        </div>
      </div>
    </div>
  );
}
DeleteFileModal.defaultProps = {
  deleteFileInfo: {
    locale: 'us-east-1',
    bucket: '',
    filePath: null,
  },
  setModalOpen: undefined,
  modalId: '',
};
DeleteFileModal.propTypes = {
  name: propTypes.string.isRequired,
  setModalOpen: propTypes.func,
  modalId: propTypes.string,
  deleteFileInfo: propTypes.shape({
    locale: propTypes.string,
    bucket: propTypes.string,
    filePath: propTypes.string,
  }),
};
