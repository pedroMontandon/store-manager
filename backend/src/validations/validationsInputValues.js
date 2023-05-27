const { idSchema, quantityReqSchema, quantityMinSchema, nameReqSchema,
    nameMinSchema } = require('./schemas');

// Id
const validateIdEntry = (id) => {
    const { error } = idSchema.validate(id);
    if (error) return { type: 400, message: '"productId" is required' };
    return null;
};

const validateSaleId = (sale) => (
  sale.reduce((acc, { productId }) => {
      if (validateIdEntry(productId)) acc.result = { message: '"productId" is required' };
      return acc;
  }, { result: null }).result
);

// Name
const validateNameReq = (name) => {
    const { error } = nameReqSchema.validate(name);
    if (error) return { message: '"name" is required' };
    return null;
};

const validateNameMin = (name) => {
    const { error } = nameMinSchema.validate(name);
    if (error) return { message: '"name" length must be at least 5 characters long' };
    return null;
};

// Quantity
const validateQuantityReq = (sale) => (
    sale.reduce((acc, { quantity }) => {
        const { error } = quantityReqSchema.validate(quantity);
        if (error) acc.result = { message: '"quantity" is required' };
        return acc;
    }, { result: null }).result
);

const validateQuantityMin = (sale) => (
    sale.reduce((acc, { quantity }) => {
        const { error } = quantityMinSchema.validate(quantity);
        if (error) acc.result = { message: '"quantity" must be greater than or equal to 1' };
        return acc;
    }, { result: null }).result
);

module.exports = { validateIdEntry, 
    validateNameReq, 
    validateNameMin, 
    validateSaleId,
    validateQuantityReq,
    validateQuantityMin,
 };