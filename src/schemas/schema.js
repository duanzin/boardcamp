import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().min(1).required(),
  pricePerDay: joi.number().min(1).required(),
});

export const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .regex(/^[0-9]+$/)
    .min(10)
    .max(11),
  cpf: joi.string().regex(/^\d+$/).length(11),
  birthday: joi.date().required(),
});

export const rentSchema = joi.object({
  customerId: Joi.number().integer().min(1).required(),
  gameId: Joi.number().integer().min(1).required(),
  daysRented: Joi.number().integer().min(1).required(),
});
