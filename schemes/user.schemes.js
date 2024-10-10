const Joi = require("joi");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signUpSchema = Joi.object({
  name: Joi.string().required().min(2).messages({
    "any.required": "Введіть ім'я",
    "string.min": '"Повинно бути щонайменше 2 символи"',
    "string.empty": "Ім'я не може бути порожнім",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Введіть пошту",
    "string.email": "Будь ласка, введіть коректну електронну адресу",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Введіть пароль",
    "string.min": "Поле має містити щонайменше 8 символів",
  }),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Введіть пошту",
    "string.email": "Будь ласка, введіть коректну електронну адресу",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Введіть пароль",
    "string.min": "Поле має містити щонайменше 8 символів",
  }),
});

module.exports = {
  signUpSchema,
  signInSchema,
};
