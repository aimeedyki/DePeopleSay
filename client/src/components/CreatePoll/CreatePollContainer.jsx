import React, { useState } from 'react';
import { replaceArrayItem } from '../../utils/replaceArrayItem';

const CreatePollContainer = (props) => {
  const [poll, setPoll] = useState({
    isAnonymous: true,
    question: ''
  });

  const [options, setOptions] = useState([]);
  const [optionFields, setOptionFields] = useState(3);
  const [errorMessages, setErrorMessage] = useState({ genericError: '' });

  const handleSubmit = () => {
    // Submit logic to be written when actions and reducers have been
    console.log('submit', poll);
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setPoll({
      ...poll,
      [target.name]: value
    });
  };

  const handleOptionChange = (event) => {
    const index = parseInt(event.target.name, 10);
    const newArray = replaceArrayItem(options, index, event.target.value);

    setOptions(newArray);
  };

  const handleAddOptionField = (event) => {
    event.preventDefault();

    if (optionFields < 5) {
      setOptionFields(optionFields + 1);
    } else {
      setErrorMessage({
        ...errorMessages,
        genericError: 'you can not have more than 5 options'
      });
    }
  };

  const { component: Component } = props;

  return (
    <Component
      errorMessages={errorMessages}
      question={poll.question}
      options={options}
      optionFields={optionFields}
      isAnonymous={poll.isAnonymous}
      handleAddOptionField={handleAddOptionField}
      handleChange={handleChange}
      handleOptionChange={handleOptionChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePollContainer;
