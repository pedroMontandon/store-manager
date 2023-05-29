const { productsModel, salesModel } = require('../models');
const { productNotFound, saleNotFound } = require('../utils/errorMap');

const validateProductId = async (id) => {
  const result = await productsModel.findProductById(id);
  if (!result) return productNotFound;
  return null;
};

const validateNewSaleId = async (sale) => {
  const resultPromises = await sale.map(({ productId }) => validateProductId(productId));
  const result = await Promise.all(resultPromises);
  const wrongId = result.every((product) => product === null);
  return wrongId ? null : productNotFound;
};

const checkingSaleIdExistence = async (id) => {
  const foundId = await salesModel.findSaleById(id);
  if (!foundId.at(1)) return saleNotFound;
  return null;
};

module.exports = { validateProductId, validateNewSaleId, checkingSaleIdExistence };