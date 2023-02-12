import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().min(1).required(),
  pricePerDay: joi.number().min(1).required()
});

export const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.number().length(11).required(),
  cpf: joi.number().length(11).required(),
  birthday: joi.date().required()  
});

export const rentSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().min(1).required()
});