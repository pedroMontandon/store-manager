const { productsModel } = require('../models');
const { productNotFound } = require('../utils/errorMap');

const validateProductId = async (id) => {
  console.log(typeof id);
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

module.exports = { validateProductId, validateNewSaleId };