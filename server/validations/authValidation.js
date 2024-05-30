const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().min(1).required().messages({
      "any.required": "Vui lòng cung cấp họ và tên",
      "string.min": "Tên phải ít nhất chứa 1 ký tự",
    }),
    email: Joi.string().min(6).required().email().messages({
      "any.required": "Vui lòng cung cấp email",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Vui lòng cung cấp mật khẩu mới",
      "string.min": "Mật khẩu ít nhất 6 ký tự",
    }),
    confirm: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.required": "Vui lòng xác nhận lại mật khẩu",
      "any.only": "Mật khẩu không trùng khớp",
    }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).email().required().messages({
      "any.required": "Vui lòng cung cấp email",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Vui lòng cung cấp mật khẩu",
      "string.min": "Mật khẩu ít nhất 6 ký tự",
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
