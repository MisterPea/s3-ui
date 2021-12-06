import * as React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './NavBar';
import FileDisplay from './FileDisplay';
import '../style/main.scss';
import BucketDisplay from './BucketDisplay';
import ErrorBar from './ErrorBar';
import { resetError } from '../redux/actions/error';

/**
 * Application entry point
 * @return {JSX}
 */
export default function App() {
  const location = useLocation();
  const { error } = useSelector((state) => state);
  const dispatch = useDispatch();

  function closeError() {
    dispatch(resetError());
  }

  return (
    <>
      <div className="main-wrapper">
        <NavBar />
        <div className="main-body-wrapper">
          <AnimatePresence exitBeforeEnter>
            <Switch key={`${location.pathname}`}>
              <Route exact path="/" component={BucketDisplay} />
              <Route exact path="/S3/" component={FileDisplay} />
              <Route path="*" component={() => <h1>404</h1>} />
            </Switch>
          </AnimatePresence>
          {error && <ErrorBar message={error} close={closeError} />}
        </div>
      </div>
    </>
  );
}
