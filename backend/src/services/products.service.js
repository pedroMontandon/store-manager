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

const createProduct = async (name) => {
    const { insertId } = await productsModel.createProduct(name);
    return { type: 201, data: { id: insertId, name } };
    // return { type: 201, 
        // data: `${name} has been added to the products table. Id: ${result.insertId}` };
};

module.exports = {
    getAllProducts,
    findProductById,
    createProduct,
};