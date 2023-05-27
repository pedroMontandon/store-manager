const { productsModel } = require('../models');
const { validateProductId } = require('../validations/validationsReturnValues');

const getAllProducts = async () => {
    const result = await productsModel.getAllProducts();
    return { type: 200, data: result };
};

const findProductById = async (id) => {
    const result = await productsModel.findProductById(id);
    if (await validateProductId(id)) return validateProductId(id);
    return { type: 200, data: result };
};

const createProduct = async (name) => {
    const { insertId } = await productsModel.createProduct(name);
    return { type: 201, data: { id: insertId, name } };
};

const updateProduct = async (name, id) => {
    if (await validateProductId(id)) return validateProductId(id);
    await productsModel.updateProduct({ name, id });
    const numberId = +id;
    return { type: 200, data: { id: numberId, name } };
};

const deleteProduct = async (id) => {
    if (await validateProductId(+id)) return validateProductId(+id);
    await productsModel.deleteProduct(id);
    return { type: 204, data: { message: 'Product deleted successfully' } };
};

module.exports = {
    getAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};