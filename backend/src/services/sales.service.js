const { salesModel } = require('../models');

const getAllSales = async () => {
    const result = await salesModel.getAllSales();
    return { type: 200, data: result };
};

const findSaleById = async (id) => {
    const result = await salesModel.findSaleById(id);
    if (result.length === 0) return { type: 404, data: { message: 'Sale not found' } };
    return { type: 200, data: result };
};

const createSale = async (sale) => {
    const { insertId } = await salesModel.createSale();

    const salePromise = sale.map((product) => salesModel.createSalesInfo(product, insertId));
    const saleInfo = Promise.all(salePromise);
    console.log(saleInfo);

    return { type: 201, data: { id: insertId, itemsSold: sale } };
};

module.exports = {
    getAllSales,
    findSaleById,
    createSale,
};