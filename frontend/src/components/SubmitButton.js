import * as React from 'react';
import propTypes from 'prop-types';

/**
 * Button component
 * @prop {string} text Text to display in the button
 * @prop {function} clickHandle Function to be called `onClick`
 * @prop {bool?} isDisabled Optional parameter. Disables/Enables button. Defaults to `false`
 * @prop {bool?} longer Widens the button by 50px on each side, for times when there's little text.
 * Defaults to `false`
 * @prop {bool?} destructive If the button commits a destructive action, we can set this argument
 * to true to style the button as such
 * @prop {string} exactWidth Include to set the width as a string. i.e.:`exactWidth="200px"`
 * @prop {string} exactHeight Include to set the height as a string. i.e.:`exactHeight="200px"`
 * @return {JSX}
 */
export default function SubmitButton({
  text,
  clickHandle,
  isDisabled = false,
  longer = false,
  destructive = false,
  exactWidth = null,
  exactHeight = null,
}) {
  return (
    <button
      aria-label={`${text} Button`}
      className={`submit-button${longer ? ' longer' : ''} ${destructive ? ' destructive' : ''}`}
      tabIndex={0}
      type="button"
      disabled={isDisabled}
      onClick={clickHandle}
      style={{ width: exactWidth, height: exactHeight }}
    >
      <h3>{text}</h3>
    </button>
  );
}

SubmitButton.defaultProps = {
  isDisabled: false,
  longer: false,
  destructive: false,
  exactWidth: null,
  exactHeight: null,
};

SubmitButton.propTypes = {
  text: propTypes.string.isRequired,
  clickHandle: propTypes.func.isRequired,
  isDisabled: propTypes.bool,
  longer: propTypes.bool,
  destructive: propTypes.bool,
  exactWidth: propTypes.string,
  exactHeight: propTypes.string,
};
