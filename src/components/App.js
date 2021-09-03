import * as React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import FileDisplay from './FileDisplay';
import './style/styles.scss';
import BucketDisplay from './BucketDisplay';

/**
 * Application entry point
 * @return {JSX}
 */
export default function App() {
  const location = useLocation();
  console.log(location.pathname)

  return (
    <>
      <div className="main-wrapper">
        <NavBar />
        <div className="main-body-wrapper">
          <AnimatePresence exitBeforeEnter>
            <Switch key={location.search}>
              <Route exact path="/" component={BucketDisplay} />
              <Route exact path="/S3" component={FileDisplay} />
              <Route path="*" component={() => <h1>404</h1>} />
            </Switch>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
