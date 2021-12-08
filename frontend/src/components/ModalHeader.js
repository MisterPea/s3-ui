import * as React from 'react';
import propTypes from 'prop-types';

export default function ModalHeader({
  Icon, iconColor = null, text, rule = false,
}) {
  return (
    <header className="modal-component-header">
      <div className={`modal-icon-unit ${iconColor || 'blue'}`}>
        <Icon className="modal-component-icon" />
      </div>
      <h1 className="modal-component-header-text">{text}</h1>
      {rule && <hr className="modal-rule" />}
    </header>
  );
}

ModalHeader.defaultProps = {
  rule: false,
  iconColor: null,
};

ModalHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Icon: propTypes.func.isRequired,
  iconColor: propTypes.string,
  text: propTypes.string.isRequired,
  rule: propTypes.bool,
};
