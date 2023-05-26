const { productsModel } = require('../models');

const getAllProducts = async () => {
    const result = await productsModel.getAllProducts();
    return { type: 200, data: result };
};

const findProductById = async (id) => {
    const result = await productsModel.findProductById(id);
    if (!result) return { type: 404, data: { message: 'Product not found' } };
    return { type: 200, data: result };
};

module.exports = {
    getAllProducts,
    findProductById,
};