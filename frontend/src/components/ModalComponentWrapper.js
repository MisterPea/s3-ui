/* eslint-disable react/prop-types */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';

/**
 * Modal component frame that wraps a work-performing component.
 * This [ModalComponentWrapper] component houses the logic to fade-in/out.
 * The child component has access to the `setModalOpen` method,
 * which when passed false (upon submit) will close the modal. There is also
 * a `close` callback, which will reset the state that opened this modal.
 * This component is fully self-contained. Upon mounting, it creates a DOM node,
 * mounts a React component to it and renders children. On component unmount, the modal
 * fades out the DOM node is removed.
 * @returns {JSX} Returns a parent/wrapper component.
 */
export default function ModalComponentWrapper({ children, close }) {
  const [modalOpen, setModalOpen] = useState(true);
  const [root, setRoot] = useState(null);
  const elementRoot = useRef(null);
  elementRoot.current = root;

  useEffect(() => {
    const body = document.querySelector('body');
    const modal = document.createElement('DIV');
    const docRoot = document.getElementById('root');
    modal.id = 'modal-mount';
    body.insertBefore(modal, docRoot);
    setRoot(document.getElementById('modal-mount'));
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

  function handleModalCloseSequence() {
    const modalMount = document.getElementById('modal-mount');
    modalMount.remove();
    close()
  }

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
          {React.cloneElement(children, { setModalOpen: () => setModalOpen() })}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>{elementRoot.current && createPortal(portalJSX, elementRoot.current)}</>
  );
}
