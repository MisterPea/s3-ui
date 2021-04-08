import React, {useState} from 'react';

/**
 * Placeholder
 * @return {JSX}
 */
export default function DragAndDrop() {
  const [onFileDrag, setOnFileDrag] = useState(false);

  const boxStyle = {
    marginTop: '20px',
    height: '200px',
    width: '200px',
    backgroundColor: '#E6E6E6',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontSize: '12px',
    paddingTop: '10px',
    borderRadius: '5px',
  };

  const appendedStyle = {
    backgroundColor: 'blue',
  };

  // const onDragOver = (e) => {
  //   const isFile = e.dataTransfer.types.includes('Files');
  //   if (isFile) {
  //     e.preventDefault();
  //     setOnFileDrag(true);
  //   }
  // };
  const handleOnDragEnter = (e) => {
    const isFile = e.dataTransfer.types.includes('Files');
    if (isFile) {
      e.preventDefault();
      setOnFileDrag(true);
    }
  };

  const handleDragLeave = (e) => {
    setOnFileDrag(false);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    // const dragData = e.dataTransfer;
    setOnFileDrag(false);
    console.log(e.dataTransfer.files);
  };


  return (
    <div
      className='dropArea'
      style={onFileDrag ? {...boxStyle, ...appendedStyle}: boxStyle}
      onDragEnter={(e) => handleOnDragEnter(e)}
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => handleDropEvent(e)}
      onDragLeave={handleDragLeave}>Drop Area</div>
  );
}