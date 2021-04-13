import React, {useEffect, useState} from 'react';
import DragAndDrop from './DragAndDrop';
import {getBucketList} from './frontendBucketMethods';

/**
 * Application entry point
 * @return {JSX}
 */
export default function App() {
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    getBucketList()
        .then(([data]) => {
          setBucketList(data);
        })
        .catch((err) => {
          console.error(`There's been a problem getting bucket list: ${err}`);
        });
  }, []);

  return (<div>
    <h2>S3 Upload</h2>
    <hr />

    <div className='bucket-list'>
      <ul>
      current buckets
        {bucketList.map(({Name}, index)=> (
          <li key={index}>
            <DragAndDrop label={Name} />
          </li>
        ))}
      </ul>
    </div>
  </div>);
};

