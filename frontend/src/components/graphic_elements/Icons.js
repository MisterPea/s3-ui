/* eslint-disable no-tabs */
import * as React from 'react';
import { IoFolderOutline } from 'react-icons/io5';
import {
  FaFileCode,
  FaFont,
  FaFilePdf,
  FaFileVideo,
  FaFileImage,
  FaFile,
  FaFileArchive,
} from 'react-icons/fa';

export function Zip() {
  return (
    <div className="file-icon">
      <FaFileArchive style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export function Image() {
  return (
    <div className="file-icon">
      <FaFileImage style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export function Code() {
  return (
    <div className="file-icon">
      <FaFileCode style={{ height: '100%', width: '100%' }} />

    </div>
  );
}

export function PDF() {
  return (
    <div className="file-icon">
      <FaFilePdf style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export function Default() {
  return (
    <div className="file-icon">
      <FaFile style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export function Folder() {
  return (
    <div className="folder-icon">
      <IoFolderOutline style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export function Media() {
  return (
    <div className="file-icon">
      <FaFileVideo style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export function Font() {
  return (
    <div className="file-icon">
      <FaFont style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
