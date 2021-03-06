import React from 'react';

import CreatePollContainer from './CreatePollContainer';
import CreatePollComponent from './CreatePollComponent';

const CreatePoll = props => (
  <CreatePollContainer {...props} component={CreatePollComponent} />
);

export default CreatePoll;
