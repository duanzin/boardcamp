import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.number().required(),
  pricePerDay: joi.number().required()
});

export const customerSchema = joi.object({
  name: joi.string().email().required(),
  phone: joi.number().required(),
  cpf: joi.number().required(),
  birthday: joi.number().required  
});

export const rentSchema = joi.object({
    customerId: joi.number().required,
    gameId: joi.number().required(),
    daysRented: joi.number().required()
});