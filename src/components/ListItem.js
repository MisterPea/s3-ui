import * as React from 'react';
import propTypes from 'prop-types';
import { FaRegFolder } from 'react-icons/fa';
import FileIcon from './FileIcon';

/**
 * Component to render a folder or a file
 * @prop {string} type The type to be rendered `file` or `folder`
 * @prop {string} name Name associated with the file or folder
 * @prop {string} lastModified Date object was last modified (Only for files)
 * @prop {number} size Size of the file (Only for files)
 * @prop {string} filePath File path leading to children (Only for folders)
 * @return {JSX}
 */
export default function ListItem({
  type, name, lastModified = null, size = null, filePath = null, callback,
}) {
  function onKeyDownFolder(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      callback(filePath);
    }
  }

  if (type === 'folder') {
    return (
      <div
        className="file-row"
        role="button"
        tabIndex={0}
        onClick={() => callback(filePath)}
        onKeyDown={(e) => onKeyDownFolder(e)}
      >
        <FaRegFolder className="file-icon" />
        <p className="file-table-data">{name}</p>
      </div>
    );
  }
  return (
    <div
      className="file-row"
    >
      <FileIcon name={name} />
      <p className="file-table-data">{name}</p>
      <p className="file-table-data">{lastModified}</p>
      <p className="file-table-data">{size}</p>
      <div className="file-table-data">Options</div>
    </div>
  );
}

ListItem.defaultProps = {
  type: '',
  name: '',
  lastModified: null,
  size: null,
  filePath: null,
  callback: null,
};

ListItem.propTypes = {
  type: propTypes.string,
  name: propTypes.string,
  lastModified: propTypes.string,
  size: propTypes.number,
  filePath: propTypes.string,
  callback: propTypes.func,
};
