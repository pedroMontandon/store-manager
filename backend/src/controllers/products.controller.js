const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
    const { type, data } = await productsService.getAllProducts();
    return res.status(type).json(data);
};

const findProductById = async (req, res) => {
    const { id } = req.params;
    const { type, data } = await productsService.findProductById(id);
    return res.status(type).json(data);
};

const createProduct = async (req, res) => {
    const { name } = req.body;
    const { type, data } = await productsService.createProduct(name);
    return res.status(type).json(data);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { type, data } = await productsService.updateProduct(name, id);
    return res.status(type).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { type, data } = await productsService.deleteProduct(id);
    return res.status(type).json(data);
};

module.exports = {
    getAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
