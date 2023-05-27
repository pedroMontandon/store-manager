const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
    const { type, data } = await salesService.getAllSales();
    return res.status(type).json(data);
};

const findSaleById = async (req, res) => {
    const { id } = req.params;
    const { type, data } = await salesService.findSaleById(id);
    return res.status(type).json(data);
};

const createSale = async (req, res) => {
    const sale = req.body;
    const { type, data } = await salesService.createSale(sale);
    return res.status(type).json(data);
};

module.exports = {
    getAllSales,
    findSaleById,
    createSale,
};