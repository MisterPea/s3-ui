import * as React from 'react';
import {
  useEffect, useRef, useState, useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import '../style/main.scss';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import createId from './helpers/createId';

/**
 * Alert bar component. Spawns a new div which is where the component is housed.
 * Once the alert is spawned a delay for automatic closure is initiated (after 5s) unless the
 * alert is moused over (which will prolong the display's appearance). When the alert is
 * closed, the div that contained it is automatically removed after the animation is complete
 * @prop {string} message Message to be output in the bar.
 * @prop {func} close Callback function to handle the closing of the alert
 * @return {JSX} Returns a component which will live in it's own div
 */
export default function ErrorBar({ message, close }) {
  const [alertOpen, setAlertOpen] = useState(true);
  const alertMountId = useRef(null);
  const [root, setRoot] = useState(null);
  const firstRun = useRef(false);
  const elementRoot = useRef(null);
  elementRoot.current = root;

  if (alertMountId.current === null) alertMountId.current = `${createId()}`;

  useEffect(() => {
    const body = document.querySelector('body');
    const alert = document.createElement('DIV');
    const docRoot = document.getElementById('root');
    alert.id = alertMountId.current;
    body.insertBefore(alert, docRoot);
    setRoot(document.getElementById(alertMountId.current));
  }, []);

  const timeout = useRef(null);
  const timeoutClear = useCallback(() => {
    clearTimeout(timeout.current);
  }, []);

  const timeoutSet = useCallback(() => {
    timeout.current = setTimeout(() => setAlertOpen(false), 5000);
  }, []);

  if (firstRun.current === false) {
    timeoutSet();
    firstRun.current = true;
  }

  function handleAlertCloseSequence() {
    const alertMount = document.getElementById(alertMountId.current);
    alertMount.remove();
    close();
  }

  const alertVariant = {
    open: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        ease: [0.25, 0.89, 0.68, 0.98],
        duration: 0.3,
      },
    },
    close: {
      y: 400,
      scale: 0.4,
      opacity: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
      },
    },
  };

  const portalJSX = (
    <motion.div
      className="alert-wrapper"
      variants={alertVariant}
      animate={alertOpen ? 'open' : 'close'}
      initial="close"
      // eslint-disable-next-line no-unused-vars
      onAnimationComplete={(opacity) => !alertOpen && handleAlertCloseSequence()}
    >
      <div
        onMouseOverCapture={timeoutClear}
        onMouseOutCapture={timeoutSet}
        className="alert-bar"
      >
        <div className="alert-content">
          <div className="alert-left-content">
            <AiOutlineExclamationCircle className="alert-icon" />
            <p>{message}</p>
          </div>
          <button type="button" className="alert-right-content">
            <IoCloseOutline
              className="alert-close-icon"
              onClick={() => setAlertOpen(false)}
              tabIndex={0}
            />
          </button>
        </div>
      </div>

    </motion.div>
  );

  return (
    <>{elementRoot.current && createPortal(portalJSX, elementRoot.current)}</>
  );
}

ErrorBar.defaultProps = {
  close: () => {},
};

ErrorBar.propTypes = {
  message: propTypes.string.isRequired,
  close: propTypes.func,
};
