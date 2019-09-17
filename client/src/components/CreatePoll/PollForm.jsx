import React from 'react';
import Form from 'react-bootstrap/Form';

import './CreatePoll.css';

// some logic commented out for error handling
const PollForm = ({
  errorMessages,
  question,
  isAnonymous,
  options,
  optionFields,
  handleAddOptionField,
  handleChange,
  handleOptionChange
}) => (
    <div className="create-poll__form">
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          name="question"
          onChange={handleChange}
          placeholder="eg: what is my best color?"
          type="text"
          value={question}
        // isInvalid={!!emailError}
        />
        <Form.Control.Feedback type="invalid">
          {/* {emailError} */}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Options</Form.Label>
        <Form.Control
          name="0"
          onChange={handleOptionChange}
          placeholder="Options should be at least 2"
          type="text"
          value={options[0] || ''}
        // isInvalid={!!userNameError}
        />
        {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group>
        <Form.Control
          name="1"
          onChange={handleOptionChange}
          placeholder="Options should be at least 2"
          type="text"
          value={options[1] || ''}
        // isInvalid={!!userNameError}
        />
        {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
      </Form.Group>
      {/* {optionFields >= 3 && */}
      <Form.Group>
        <Form.Control
          name="2"
          onChange={handleOptionChange}
          placeholder="Options should be at least 2"
          type="text"
          value={options[2] || ''}
        // isInvalid={!!userNameError}
        />
        {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
      </Form.Group>
      {optionFields >= 4 && <Form.Group>
        <Form.Control
          name="3"
          onChange={handleOptionChange}
          placeholder="Options can not be more than 5"
          type="text"
          value={options[3] || ''}
        // isInvalid={!!userNameError}
        />
        {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
      </Form.Group>}
      {optionFields === 5 && <Form.Group>
        <Form.Control
          name="4"
          onChange={handleOptionChange}
          placeholder="Options can not be more than 5"
          type="text"
          value={options[4] || ''}
          isInvalid={!!errorMessages.genericError}
        />
        {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
      </Form.Group>}
      <Form.Control.Feedback type="invalid">
        {errorMessages.genericError}
      </Form.Control.Feedback>
      <a
        href="#1"
        className="add-link"
        onClick={handleAddOptionField}
      >
        Add more options
      </a>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox"
          name="isAnonymous"
          checked={isAnonymous}
          onChange={handleChange}
          label=" Create Anonymously"
        />
      </Form.Group>
    </div>
);

export default PollForm;
