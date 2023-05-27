const Joi = require('joi');

// Id
const idSchema = Joi.number().required();

const saleIdSchema = Joi.number().required();

// Name
const nameReqSchema = Joi.string().required();

const nameMinSchema = Joi.string().min(5).required();

// Quantity
const quantityReqSchema = Joi.number().required();

const quantityMinSchema = Joi.number().min(1);

module.exports = {
  idSchema,
  saleIdSchema,
  nameReqSchema,
  nameMinSchema,
  quantityReqSchema,
  quantityMinSchema,
  };