import React, { useState } from 'react';
import propTypes from 'prop-types';

/** Intermediary wrapper to hold path state info on re-renders
 * and prevent folders from resetting position when files are added.
 * @param {object} children children object passed through
 * @return {JSX} returns children from parent
*/
export default function JsxPathHolder({ children }) {
  const [pathState, setPathState] = useState([]);

  return (
    <div>
      {React.cloneElement(
          children,
          {pathState: pathState, setPathState: setPathState},
      )}
    </div>
  );
}
JsxPathHolder.propTypes = {
  children: propTypes.object,
};
