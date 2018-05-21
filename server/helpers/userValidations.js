import Joi from 'joi';
import formValidator from './formValidator';

/** @description validates the signup form
 *
 * @param {Object} form a form object
 * @returns {object} response object with a boolean flag
 * and an optional message
 */
export const signupValidation = (form) => {
  const signupSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
  });

  return formValidator(form, signupSchema);
};

/** @description validates the signin form
 *
 * @param {Object} form a form object
 * @returns {object} response object with a boolean flag
 * and an optional message
 */
export const signinValidation = (form) => {
  const signinSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().trim().required()
  });

  return formValidator(form, signinSchema);
};
