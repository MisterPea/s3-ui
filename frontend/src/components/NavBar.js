import * as React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import useParseQuery from './helpers/useParseQuery';
import MainLogo from './graphic_elements/MainLogo';
import createId from './helpers/createId';
import removeQuery from './helpers/removeQuery';

export default function NavBar() {
  const parsedQuery = useParseQuery();
  const history = useHistory();
  const { buckets } = useSelector((state) => state);
  const { id, loc, path = null } = parsedQuery;

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

  function Breadcrumbs({ bcPath }) {
    const pathArray = bcPath ? bcPath.split('/') : [];
    const links = bcPath !== null ? pathArray : [];
    return (
      <div className="breadcrumb-wrapper">
        <ul className="breadcrumb-ul">
          <li className="breadcrumb-li">
            <div
              onClick={() => handleBreadcrumbRoot()}
              onKeyDown={(e) => handleKeyboardClick(e)}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              {'S3\u00A0>\u00A0'}
            </div>
          </li>
          <li className="breadcrumb-li">
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

  return (
    <div className={`nav-component${id ? '' : '-bucket'}`}>
      <div className="nav-bar">
        <div className="logo-lg"><MainLogo /></div>
        <div className="bucket-id-loc">
          <div className="bucket-id-wrapper">
            <h3 className="bucket-name">{id}</h3>
            <p className="bucket-region">{loc}</p>
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
