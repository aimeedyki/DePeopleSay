import Joi from 'joi';

/** @description validates a form with joi
 *
 * @param {Object} formDetails a form object
 * @param {Object} schema a guideline for each field validation
 * @returns {object} response object with a boolean flag
 * and an optional message
 */
export default (formDetails, schema) => {
  const { error } = Joi.validate(formDetails, schema);
  if (error) {
    return {
      isValid: false,
      message: error.details[0].message
    };
  }
  return {
    isValid: true
  };
};
