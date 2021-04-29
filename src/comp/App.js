import React, {useEffect, useState} from 'react';
import BucketMain from './BucketMain';
import AddBucket from './bucket_methods/AddBucket';
import {getBucketList} from './bucket_methods/frontendBucketMethods';
import DragDrop from './bucket_methods/DragDrop';
import '../style/main.scss';

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

  return (
    <div>
      <h2 className='bold-text xlg-text'>S3 Upload</h2>
      <hr />

      <div className='bucket-list'>
        <p className='body-text lg-text'>Current Buckets</p>
        <ul>
          {bucketList.map(({Name}, index)=> (
            <li key={index} className='bucket-li-wrapper'>
              <DragDrop bucket={Name}>
                <BucketMain label={Name} />
              </DragDrop>
            </li>
          ))}
          <li>
            <AddBucket bucketList={bucketList}/>
          </li>
        </ul>
      </div>
    </div>);
};

