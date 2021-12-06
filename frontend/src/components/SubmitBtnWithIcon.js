import * as React from 'react';
import propTypes from 'prop-types';

/**
 * Button component
 * @prop {string} text Text to display in the button
 * @prop {function} clickHandle Function to be called `onClick`
 * @prop {bool?} isDisabled Optional parameter. Disables/Enables button. Defaults to `false`
 * @prop {bool?} fullWidth Optional parameter. Disables/Enable 100% width. Defaults to `false`
 * @prop {bool?} longer Widens the button by 50px on each side, for times when there's little text.
 * Defaults to `false`
 * @prop {bool?} destructive If the button commits a destructive action, we can set this
 * argument to true to style the button as such
 * @return {JSX}
 */
export default function SubmitBtnWithIcon({
  text,
  Icon,
  clickHandle,
  isDisabled = false,
  fullWidth = false,
  longer = false,
  destructive = false,
}) {
  const buildClassName = () => (
    `${longer ? ' longer' : ''}`
  + `${destructive ? ' destructive' : ''}`
  + `${fullWidth ? ' full-width' : ''}`);

  return (
    <button
      className={`submit-button-icon${buildClassName()}`}
      tabIndex={0}
      type="button"
      disabled={isDisabled}
      onClick={clickHandle}
    >
      <div className="submit-content-wrapper">
        <div className="file-icon">
          <Icon />
        </div>
        <h2>{text}</h2>
      </div>
    </button>
  );
}

SubmitBtnWithIcon.defaultProps = {
  isDisabled: false,
  longer: false,
  destructive: false,
  fullWidth: false,
};

SubmitBtnWithIcon.propTypes = {
  text: propTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  Icon: propTypes.func.isRequired,
  clickHandle: propTypes.func.isRequired,
  fullWidth: propTypes.bool,
  isDisabled: propTypes.bool,
  longer: propTypes.bool,
  destructive: propTypes.bool,
};
