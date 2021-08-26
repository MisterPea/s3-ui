import * as React from 'react';
import { Route, Switch } from 'react-router';
import NavBar from './NavBar';
import BucketDisplay from './BucketDisplay';
import FileDisplay from './FileDisplay';

import '../style/main.scss';

/**
 * Application entry point
 * @return {JSX}
 */
export default function App() {
  return (
    <>
      <div className="main-wrapper">
        <NavBar />
        <div className="main-body-wrapper">
          <Switch>
            <Route exact path="/" component={BucketDisplay} />
            <Route exact path="/S3" component={FileDisplay} />
            <Route path="*" component={() => <h1>404</h1>} />
          </Switch>
        </div>
      </div>
    </>
  );
}
