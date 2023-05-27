const connection = require('./connection');

const getAllSales = async () => {
    const [result] = await connection.execute(`SELECT id AS saleId,
     date, sales_products.product_id AS productId, sales_products.quantity FROM sales
    INNER JOIN sales_products ON sales_products.sale_id = sales.id
    ORDER BY saleId, productId;`);
    return result;
};

const findSaleById = async (id) => {
    const [result] = await connection.execute(`SELECT date,
     sales_products.product_id AS productId, sales_products.quantity FROM sales
    INNER JOIN sales_products ON sales_products.sale_id = sales.id
    WHERE id = ?;`, [id]);
    return result;
};

const createSale = async () => {
    const [resultSales] = await connection.execute('INSERT INTO sales (date) VALUES(DEFAULT)'); 
    return resultSales;
};

const createSalesInfo = async ({ productId, quantity }, id) => {
    const [salesInfo] = await connection.execute(`INSERT INTO sales_products 
    (sale_id, product_id, quantity) VALUES(?, ?, ?)`, [id, productId, quantity]);
    return salesInfo;
};

module.exports = {
    getAllSales,
    findSaleById,
    createSale,
    createSalesInfo,
};