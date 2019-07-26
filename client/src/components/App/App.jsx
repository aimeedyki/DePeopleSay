import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from '../Home';
import LandingPage from '../LandingPage/LandingPage';
import CreatePoll from '../CreatePoll';


const App = () => (
  <div className="App">
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/new-poll' component={CreatePoll} />
      <Route path='/' component={LandingPage} />
    </Switch>
  </div>
);

export default App;
