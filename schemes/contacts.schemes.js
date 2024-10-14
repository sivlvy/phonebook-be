const Joi = require("joi");

const phoneNumberRegexp =
  /^\+?(\d{2}-?\d{3}-?\d{3}-?\d{2}-?\d{2})$|^\d{7}$|^\d{10}$|^\+?\d{12}$/;

const createContactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Введіть ім'я",
    "string.min": "Має бути щонайменше 2 символи",
  }),
  phone_number: Joi.string().required().pattern(phoneNumberRegexp).messages({
    "string.empty": "Введіть номер телефону",
    "string.pattern.base": "Номер телефону повинен мати 7, 10 або 12 цифр",
  }),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  phone_number: Joi.string().pattern(phoneNumberRegexp),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
};
