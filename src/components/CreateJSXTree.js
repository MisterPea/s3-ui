import React, { useState } from 'react';
import { VscFile, VscFolder } from 'react-icons/vsc';
import propTypes from 'prop-types';

/**
 * Method to render a JSX tree of a file directory
 * @param {Object[]} data Array of objects containing folder and file info
 * @return {JSX} JSX output
 */
export function CreateJSXTree({data}) {
  return data.map((item) => {
    if (item.type === 'file') {
      return <File key={item.name} name={item.name} path={item.path}/>;
    }
    if (item.type === 'folder') {
      return (<Folder name={`${item.name}`}>
        <CreateJSXTree data={item.children}/>
      </Folder>);
    }
  });
}
CreateJSXTree.propTypes = {
  data: propTypes.array,
};

/**
 * Component that renders a file name and icon
 * @param {string} name Name of the file
 * @return {JSX} Rendered JSX
 */
function File({ name, path }) {
  return (
    <div
      className='file'
      style={{'paddingLeft': '20px'}}
    >
      <VscFile />
      <span className='file-text'>{name}</span>
      <span>{path}</span>
    </div>
  );
}
File.propTypes = {
  name: propTypes.string,
  path: propTypes.string,
};

/**
 * Component to render a folder component
 * @param {string} name Name of folder
 * @param {array} children Children to render when opened
 * @return {JSX} Rendered JSX
 */
function Folder({name, children}) {
  const [folderOpen, setFolderOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderOpen(!folderOpen);
  };

  console.log(`Folder-Key:${name}`);
  return (
    <div
      key={name}
      style={{'paddingLeft': '20px'}}
      className='folder'
      onClick={handleToggle}>
      <VscFolder />
      <span className='folder-text'>{name}</span>
      <div
        hidden={!folderOpen}
        style={{height: `${folderOpen ? 'auto': '0'}`, overflow: 'hidden'}}
      >{children}</div>
    </div>
  );
}
Folder.propTypes = {
  name: propTypes.string,
  children: propTypes.object,
};
