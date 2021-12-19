import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useParseQuery from './helpers/useParseQuery';
import MainLogo from './graphic_elements/MainLogo';
import createId from './helpers/createId';
import removeQuery from './helpers/removeQuery';

export default function NavBar() {
  const [showProgress, setShowProgress] = useState(undefined);
  const parsedQuery = useParseQuery();
  const history = useHistory();
  const { buckets, uploadProgress } = useSelector((state) => state);
  const { id, loc, path = null } = parsedQuery;
  const progressCapture = useRef(0);

  function handleBreadcrumbNav(query, modifier = null) {
    const newPath = removeQuery(query, modifier, parsedQuery);
    history.push(newPath);
  }

  function handleKeyboardClick(e, query = null) {
    if (e.key === 'Enter') {
      if (query === null) {
        handleBreadcrumbRoot();
      } else {
        handleBreadcrumbNav(query);
      }
    }
  }

  function handleBreadcrumbRoot() {
    history.push('/');
  }

  function joinArray(array, stopIndex) {
    const newArray = array.slice(0, stopIndex + 1);
    return newArray.join('/');
  }

  // This function and useEffect (below) handle the deployment of upload progress
  function calcUploadProgress() {
    let total = 0;
    uploadProgress.forEach((upload) => { total += upload.percentage; });
    return total / uploadProgress.length;
  }

  useEffect(() => {
    if (uploadProgress.length > 0) {
      setShowProgress(calcUploadProgress());
    } else if (uploadProgress.length === 0 && showProgress) {
      setShowProgress(undefined);
    }
  }, [uploadProgress]);

  function Breadcrumbs({ bcPath }) {
    const pathArray = bcPath ? bcPath.split('/') : [];
    const links = bcPath !== null ? pathArray : [];
    return (
      <div className="breadcrumb-wrapper">
        <ul className="breadcrumb-ul" role="menubar">
          <li className="breadcrumb-li" role="menuitem">
            <div
              onClick={() => handleBreadcrumbRoot()}
              role="button"
              onKeyDown={(e) => handleKeyboardClick(e)}
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              {'S3-Root\u00A0>\u00A0'}
            </div>
          </li>
          <li className="breadcrumb-li" role="menuitem">
            <div
              onClick={() => handleBreadcrumbNav('path')}
              onKeyDown={(e) => handleKeyboardClick(e, 'path')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              {id}
            </div>
          </li>
          {links.map((link, index) => (
            <li
              key={createId()}
              className="breadcrumb-li"
            >
              <div
                onClick={() => handleBreadcrumbNav('path', joinArray(pathArray, index))}
                onKeyDown={(e) => handleKeyboardClick(e, joinArray(pathArray, index))}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <span className="breadcrumb-arrow">{'\u00A0>\u00A0'}</span>
                <span className="breadcrumb-link">{link}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  Breadcrumbs.defaultProps = {
    bcPath: null,
  };

  Breadcrumbs.propTypes = {
    bcPath: propTypes.string,
  };

  function DisplayBucketCount() {
    return (
      <div className="bucket-number-wrapper">
        <div className="buckets-number">{`Buckets (${buckets ? buckets.length : '0'})`}</div>
      </div>
    );
  }

  const progressBarVariant = {
    init: {
      scaleY: 0,
      height: 0,
    },
    closed: {
      scaleY: 0,
      height: 0,
      transition: {
        delay: 0.4,
        duration: 0.3,
      },
    },
    open: {
      scaleY: 1,
      height: '5px',
      transition: {
        duration: 0.2,
      },
    },
  };

  // floating method to hold 100% once it's met
  if (showProgress !== undefined) {
    progressCapture.current = showProgress;
  }

  return (
    <div className={`nav-component${id ? '' : '-bucket'}`}>

      <motion.div
        key="progress-outer"
        className="progress-wrapper"
        initial="init"
        variants={progressBarVariant}
        animate={showProgress !== undefined ? 'open' : 'closed'}
      >
        <motion.div
          key="progress-motion-bar"
          className="progress-bar-top"
          initial={{ width: 0 }}
          animate={{ width: `${progressCapture.current}%` }}
        />
        <div className="progress-bar-back" />
      </motion.div>

      <div className="nav-bar">
        <div className="logo-lg" role="img" aria-label="S3 UI" alt="S3 UI"><MainLogo /></div>
        <div className="bucket-id-loc">
          <div className="bucket-id-wrapper">
            <h3 className="bucket-name" aria-label="Bucket Name">{id}</h3>
            <p className="bucket-region" aria-label="Bucket Region">{loc}</p>
          </div>
        </div>
        <p className="contact-btn">Contact</p>
      </div>
      {id
        ? <Breadcrumbs bcPath={path} />
        : <DisplayBucketCount />}
    </div>
  );
}
