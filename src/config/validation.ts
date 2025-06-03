import Joi from "joi";

export const formValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .required()
    .pattern(/^\+?[1-9]\d{1,14}$/),
  district: Joi.string().required().min(2).max(100),
  address: Joi.string().required().min(5).max(200),
  message: Joi.string().required().min(10).max(1000),
  consent: Joi.boolean().required().valid(true),
});

export const validateForm = (data: any) => {
  return formValidationSchema.validate(data, { abortEarly: false });
};
