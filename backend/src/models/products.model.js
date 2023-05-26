const connection = require('./connection');

const getAllProducts = async () => {
    const [result] = await connection.execute('SELECT * FROM products ORDER BY id');
    return result;
};

const findProductById = async (id) => {
    const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllProducts,
    findProductById,
};