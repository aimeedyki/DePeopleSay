import React from 'react';
import uniqueId from 'lodash/uniqueId';
import ListGroup from 'react-bootstrap/ListGroup';

import './CreatePoll.css';

const pollPreview = ({ isAnonymous, question, options }) => (
  <div>
    <p className="preview__user-details">{isAnonymous ?
      'Anonymous' : 'Aimee'} :</p>
    <h5
      className="create-poll__question"
    >
      {question}
    </h5>
    <ListGroup variant="flush">
      {options.map(option =>
        option && <ListGroup.Item key={uniqueId('createOption-')}>
          {option}
        </ListGroup.Item>)}
    </ListGroup>
  </div>
);

export default pollPreview;
