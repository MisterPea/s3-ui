import * as React from 'react';
import propTypes from 'prop-types';
import { Folder } from './graphic_elements/Icons';
import FileIcon from './helpers/FileIcon';

/**
 * Component to render a folder or a file
 * @prop {string} type The type to be rendered `file` or `folder`
 * @prop {string} name Name associated with the file or folder
 * @prop {string} lastModified Date object was last modified (Only for files)
 * @prop {number} size Size of the file (Only for files)
 * @prop {string} filePath File path leading to children (Only for folders)
 * @return {JSX}
 */
export default function FileLI({
  type, name, lastModified = null, size = null, filePath = null, callback,
}) {
  function onKeyDownFolder(e) {
    e.preventDefault();
    if (e.key === 'Enter') callback(filePath);
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
        <div className="icon-wrapper"><Folder /></div>
        <p className="file-table-data">{name}</p>
      </div>
    );
  }
  return (
    <div
      className="file-row"
    >
      <div className="icon-wrapper"><FileIcon name={name} /></div>
      <p className="file-table-data name">{name}</p>
      <p className="file-table-data last-modified">{lastModified}</p>
      <p className="file-table-data size">{size}</p>
      <div className="file-table-data options">Options</div>
    </div>
  );
}

FileLI.defaultProps = {
  type: '',
  name: '',
  lastModified: null,
  size: null,
  filePath: null,
  callback: null,
};

FileLI.propTypes = {
  type: propTypes.string,
  name: propTypes.string,
  lastModified: propTypes.string,
  size: propTypes.number,
  filePath: propTypes.string,
  callback: propTypes.func,
};
