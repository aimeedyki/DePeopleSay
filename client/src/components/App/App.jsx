import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import LandingPage from '../LandingPage/LandingPage';

const App = () => (
  <div className="App">
    <Route path='/' component={LandingPage} />
  </div>
);

export default App;
