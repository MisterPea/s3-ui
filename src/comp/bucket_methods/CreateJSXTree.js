import React from 'react';
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
 * pathState and setPathState are passed in from JsxPathHolder
 */
export function CreateJSXTree({
  data, bucket, setState,
  region, pathState, setPathState }) {
  return data.map((item) => {
    if (item.type === 'file') {
      return (
        <File
          key={`${item.name}${++index}`}
          name={item.name}
          path={item.path}
          region={region}
          bucket={bucket}
          setState={setState}/>
      );
    }
    if (item.type === 'folder') {
      return (
        <Folder
          key={`${item.name}${++index}`}
          region={region}
          bucket={bucket}
          name={`${item.name}`}
          path={item.path}
          setState={setState}
          pathState={pathState}
          setPathState={setPathState}>
          <CreateJSXTree
            data={item.children}
            bucket={bucket}
            region={region}
            setState={setState}
            pathState={pathState}
            setPathState={setPathState}
          />
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
function Folder({
  name, children, bucket, path,
  setState, region, pathState, setPathState }) {
  const pathTest = (currentPath) => {
    if (pathState.includes(currentPath)) {
      // toggle open folders
      return pathState.filter((e) => e !== currentPath);
    }
    // check to see if the folder being opened is in the path of an
    // already opened folder
    for (let i = pathState.length - 1; i >= 0; i--) {
      if (currentPath.includes(pathState[i]) === false) {
        pathState = pathState.filter((e) => e !== pathState[i]);
      }
    }
    return [...pathState, currentPath];
  };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newPath = pathTest(path);
    setPathState(newPath);
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
          {...console.log(pathState, '+++++')}
          className={pathState.includes(path) ?
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
  pathState: propTypes.array,
  setPathState: propTypes.func,
};
