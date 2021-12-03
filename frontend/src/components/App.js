import * as React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import FileDisplay from './FileDisplay';
import '../style/main.scss';
import BucketDisplay from './BucketDisplay';
import ErrorBar from './ErrorBar';
/**
 * Application entry point
 * @return {JSX}
 */
export default function App() {
  const location = useLocation();

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
          <ErrorBar message="Could not create new folder" close={() => {}} />
        </div>
      </div>
    </>
  );
}
