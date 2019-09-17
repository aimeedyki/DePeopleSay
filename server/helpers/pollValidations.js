import Joi from 'joi';
import formValidator from './formValidator';

export const createPollValidation = (form) => {
  const createPollSchema = Joi.object().keys({
    question: Joi.string().min(6).required(),
    options: Joi.array().items().unique().min(2)
      .max(5)
      .required()
  }).unknown();

  return formValidator(form, createPollSchema);
};
