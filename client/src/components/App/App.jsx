import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from '../Home';
import LandingPage from '../LandingPage/LandingPage';
import CreatePoll from '../CreatePoll';
import NavBar from '../NavBar';
import routes from '../../routes';
import ProtectedRoute from '../ProtectedRoute';

const App = () => (
  <div className="App">
    <Switch>
      <Route
        path='/app'
        render={() => (
          <React.Fragment>
            <NavBar />
            <div className="app__container">
              <Switch>
                <ProtectedRoute path={routes.home} component={Home} />
                <ProtectedRoute path={routes.newPoll} component={CreatePoll} />
              </Switch>
            </div>
          </React.Fragment>
        )}
      />
      <Route path={routes.landingPage} component={LandingPage} />
    </Switch>
  </div>
);

export default App;
