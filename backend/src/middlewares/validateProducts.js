const { validateNameReq, validateNameMin } = require('../validations/validationsInputValues');

const validateNewProduct = (req, res, next) => {
  const { name } = req.body;

  if (validateNameReq(name)) return res.status(400).json(validateNameReq(name));
  if (validateNameMin(name)) return res.status(422).json(validateNameMin(name));

  return next();
};

module.exports = {
  validateNewProduct,
};