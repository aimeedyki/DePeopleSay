import validator from 'validator';

export const signupValidator = (formDetails) => {
  const error = {};
  if (!validator.isEmail(formDetails.email)) {
    error.email = 'Please provide a valid email';
  }
  if (!validator.isLength(formDetails.username, { min: 3 })) {
    error.username = 'Username must be 3 characters or more';
  }
  if (!validator.isLength(formDetails.password, { min: 6 })) {
    error.password = 'Password must be 6 characters or more';
  }
  return error;
};

