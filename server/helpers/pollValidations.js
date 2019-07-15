import Joi from 'joi';
import formValidator from './formValidator';

export const createPollValidation = (form) => {
  const option = Joi.object().keys({
    optionValue: Joi.string().required(),
  });

  const createPollSchema = Joi.object().keys({
    question: Joi.string().min(6).required(),
    options: Joi.array().items(option).unique().min(2)
      .max(5)
  }).unknown();

  return formValidator(form, createPollSchema);
};
