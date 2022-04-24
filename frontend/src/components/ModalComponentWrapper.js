/* eslint-disable react/prop-types */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import '../style/main.scss';
import createId from './helpers/createId';

/**
 * Modal component frame that wraps a work-performing component.
 * This [ModalComponentWrapper] component houses the logic to fade-in/out.
 * The child component has access to the `setModalOpen` method,
 * which when passed false (upon submit) will close the modal. There is also
 * a `close` callback, which will reset the state that opened this modal.
 * This component is fully self-contained. Upon mounting, it creates a DOM node,
 * mounts a React component to it and renders children. On component unmount, the modal
 * fades out the DOM node is removed.
 * * For cases where the DOM node is removed (e.g. deleteFile, deleteFolder), we need to pass the
 * name of the node element to the method that removed it, so it can also remove the extraneous
 * element. This is because any reference to it or its methods has been removed.
 * So, it must be removed by the surviving method.
 * @returns {JSX} Returns a parent/wrapper component.
 */
export default function ModalComponentWrapper({ children, close = undefined }) {
  const [modalOpen, setModalOpen] = useState(true);
  const modalMountId = useRef(null);
  const [root, setRoot] = useState(null);
  const elementRoot = useRef(null);
  elementRoot.current = root;

  if (modalMountId.current === null) modalMountId.current = `${createId()}`;

  useEffect(() => {
    const body = document.querySelector('body');
    const modal = document.createElement('DIV');
    const docRoot = document.getElementById('root');
    modal.id = modalMountId.current;
    body.insertBefore(modal, docRoot);
    setRoot(document.getElementById(modalMountId.current));
  }, []);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

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
        ease: [0.57, 0.24, 0.74, 0.86],
        // delay: 0.1,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.7,
      transition: {
        type: 'tween',
        ease: [0.57, 0.24, 0.74, 0.86],
        duration: 0.2,
      },
    },
    init: {
      opacity: 0,
      y: 100,
      scale: 0.7,
      transition: {
        type: 'tween',
        ease: [0.57, 0.24, 0.74, 0.86],
        duration: 0.2,
      },
    },
  };

  function handleModalCloseSequence() {
    const modalMount = document.getElementById(modalMountId.current);
    modalMount.remove();
    close && close();
  }

  function handleClickOutside(e) {
    if (e.target.className === 'modal-overlay') {
      setModalOpen(false);
    }
  }

  const portalJSX = (
    <motion.div
      role="dialog"
      variants={modalBackOverlay}
      initial="closed"
      animate={modalOpen ? 'open' : 'closed'}
      onClick={(e) => handleClickOutside(e)}
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
        <IoIosClose
          aria-label="Close modal"
          onClick={() => setModalOpen(false)}
          tabIndex={0}
          className="modal-close-button"
        />
        <>
          {React.cloneElement(children, {
            setModalOpen: () => setModalOpen(), modalId: modalMountId.current,
          })}
        </>
      </motion.div>
    </motion.div>
  );

  return (
    <>{elementRoot.current && createPortal(portalJSX, elementRoot.current)}</>
  );
}
