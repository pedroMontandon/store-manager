const { validateQuantityReq,
     validateQuantityMin, 
     validateSaleId } = require('../validations/validationsInputValues');

const validateNewSale = (req, res, next) => {
    const sale = req.body;

    if (validateSaleId(sale)) return res.status(400).json(validateSaleId(sale));
    if (validateQuantityReq(sale)) return res.status(400).json(validateQuantityReq(sale));
    if (validateQuantityMin(sale)) return res.status(422).json(validateQuantityMin(sale));

    return next();
};

const validateSaleUpdate = (req, res, next) => {
    const { quantity } = req.body;
    if (validateQuantityReq([{ quantity }])) {
        return res.status(400).json(validateQuantityReq([{ quantity }]));
    }
    if (validateQuantityMin([{ quantity }])) {
        return res.status(422).json(validateQuantityMin([{ quantity }]));
    }
    return next();
};

module.exports = {
    validateNewSale,
    validateSaleUpdate,
};