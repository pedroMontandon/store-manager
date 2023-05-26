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

module.exports = {
    getAllProducts,
    findProductById,
};
