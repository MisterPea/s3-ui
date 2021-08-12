import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLogo from './MainLogo';
import BucketDisplay from './BucketDisplay';
import { getBucketList } from '../actions/bucket';
import '../style/main.scss';

/**
 * Application entry point
 * @return {JSX}
 */
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBucketList());
  }, [dispatch]);

  return (
    <>
      <div className="main-wrapper">
        <div className="nav-bar">
          <div className="logo-lg"><MainLogo /></div>
          <p className="contact-btn">Contact</p>
        </div>
        <BucketDisplay />
      </div>
    </>
  );
}
