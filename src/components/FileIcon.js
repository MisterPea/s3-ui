import * as React from 'react';
import propTypes from 'prop-types';
import {
  FaFileArchive, FaFileCode, FaFileImage, FaFile, FaFilePdf,
} from 'react-icons/fa';

export default function FileIcon({ name }) {
  const extension = name.split('.');
  switch (extension[extension.length - 1]) {
    case 'jpeg':
    case 'jpg':
    case 'gif':
    case 'tiff':
    case 'tif':
    case 'png':
    case 'svg':
    case 'ico':
      return <FaFileImage className="file-icon" />;
    case 'html':
    case 'htm':
    case 'js':
    case 'json':
    case 'css':
    case 'sass':
    case 'scss':
    case 'py':
    case 'php':
    case 'sh':
      return <FaFileCode className="file-icon" />;
    case 'pdf':
    case 'ps':
      return <FaFilePdf className="file-icon" />;
    case 'zip':
    case 'pkg':
    case 'gz':
    case 'rar':
      return <FaFileArchive className="file-icon" />;
    default:
      return <FaFile className="file-icon" />;
  }
}

FileIcon.defaultProps = {
  name: '',
};

FileIcon.propTypes = {
  name: propTypes.string,
};
