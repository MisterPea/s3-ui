import React, { useState } from 'react';
import { VscFile, VscFolder } from 'react-icons/vsc';
import '../../style/main.scss';
import DragDrop from './DragDrop';
import propTypes from 'prop-types';
import { makeCssValid } from './frontendBucketMethods';
let index = 0;

// ******************** TODO: ******************** //
// ******** Add catch for empty directory ******** //
// *********************************************** //

/**
 * Method to render a JSX tree of a file directory
 * @param {Object[]} data Array of objects containing folder and file info
 * @return {JSX} JSX output
 */
export function CreateJSXTree({ data, bucket, setState, region }) {
  return data.map((item) => {
    if (item.type === 'file') {
      return <File
        key={`${item.name}${++index}`}
        name={item.name}
        path={item.path}
        region={region}
        bucket={bucket}
        setState={setState}/>;
    }
    if (item.type === 'folder') {
      return (<Folder
        key={`${item.name}${++index}`}
        region={region}
        bucket={bucket}
        name={`${item.name}`}
        path={item.path}
        setState={setState}>
        <CreateJSXTree data={item.children} bucket={bucket} region={region}/>
      </Folder>);
    }
  });
}
CreateJSXTree.propTypes = {
  data: propTypes.array,
  bucket: propTypes.string,
  setState: propTypes.func,
  region: propTypes.string,
};


/**
 * Component that renders a file name and icon
 * @param {String} name Name of the file
 * @return {JSX} Rendered JSX
 */
function File({ name, path, bucket, setState, region }) {
  return (
    <DragDrop bucket={bucket} path={path} setState={setState}>
      <li className={`jsx-li ${makeCssValid(bucket)}${path === undefined ?
       '' :
       '-' + makeCssValid(path)}`}
      data-region={region}>
        <VscFile />
        <span className='file-text sm-text'>{name}</span>
      </li>
    </DragDrop>
  );
}
File.propTypes = {
  name: propTypes.string,
  path: propTypes.string,
  bucket: propTypes.string,
  setState: propTypes.func,
  region: propTypes.string,
};

/**
 * Component to render a folder component
 * @param {String} name Name of folder
 * @param {array} children Children to render when opened
 * @return {JSX} Rendered JSX
 */
function Folder({ name, children, bucket, path, setState, region }) {
  const [folderOpen, setFolderOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderOpen(!folderOpen);
  };

  return (
    <DragDrop bucket={bucket} path={path} setState={setState}>
      <ul className={`folder ${makeCssValid(bucket)}${path === undefined ?
        '' :
        '-' + makeCssValid(path)}`}
      onClick={handleToggle}
      data-region={region}>
        <VscFolder className='folder-icon' />
        <span className='folder-text md-text'>{name}</span>
        <div
          className={folderOpen ?
            'folder-children-open' :
            'folder-children-close'}
        >{children}</div>
      </ul>
    </DragDrop>
  );
}

Folder.propTypes = {
  name: propTypes.string,
  children: propTypes.object,
  bucket: propTypes.string,
  path: propTypes.string,
  setState: propTypes.func,
  region: propTypes.string,
};
