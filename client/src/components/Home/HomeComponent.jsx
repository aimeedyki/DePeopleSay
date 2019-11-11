import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../routes';

const HomeComponent = props =>
  <div>
    <h1>Welcome to your Home</h1>
    <Button
      variant="outline-warning"
      onClick={() => props.history.push(routes.newPoll)}
    >
      Create Poll
    </Button>
  </div>;

export default connect()(withRouter(HomeComponent));
