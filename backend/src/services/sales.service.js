const { salesModel } = require('../models');
const { saleNotFound } = require('../utils/errorMap');
const { validateNewSaleId, 
    checkingSaleIdExistence } = require('../validations/validationsReturnValues');

const getAllSales = async () => {
    const result = await salesModel.getAllSales();
    return { type: 200, data: result };
};

const findSaleById = async (id) => {
    const result = await salesModel.findSaleById(id);
    if (result.length === 0) return saleNotFound;
    return { type: 200, data: result };
};

const createSale = async (sale) => {
    if (await validateNewSaleId(sale)) return validateNewSaleId(sale);

    const { insertId } = await salesModel.createSale();

    const salePromise = sale.map((product) => salesModel.createSalesInfo(product, insertId));
    await Promise.all(salePromise);
    return { type: 201, data: { id: insertId, itemsSold: sale } };
};

const deleteSale = async (id) => {
    if (await checkingSaleIdExistence(id)) return checkingSaleIdExistence(id);
    await salesModel.deleteSale(id);
    return { type: 204, data: {} };
};

module.exports = {
    getAllSales,
    findSaleById,
    createSale,
    deleteSale,
};