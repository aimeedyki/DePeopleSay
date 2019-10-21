import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from '../Home';
import LandingPage from '../LandingPage/LandingPage';
import CreatePoll from '../CreatePoll';
import NavBar from '../NavBar';


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
                <Route path='/app/home' component={Home} />
                <Route path='/app/new-poll' component={CreatePoll} />
              </Switch>
            </div>
          </React.Fragment>
        )}
      />
      <Route path='/' component={LandingPage} />
    </Switch>
  </div>
);

export default App;
