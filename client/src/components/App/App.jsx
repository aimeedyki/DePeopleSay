import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import Home from '../Home';

const App = () => (
  <div className="App">
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/' component={LandingPage} />
    </Switch>
  </div>
);

export default App;
