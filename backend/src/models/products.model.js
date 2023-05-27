const connection = require('./connection');

const getAllProducts = async () => {
    const [result] = await connection.execute('SELECT * FROM products ORDER BY id');
    return result;
};

const findProductById = async (id) => {
    const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return result;
};

const createProduct = async (name) => {
    const [result] = await connection.execute('INSERT INTO products (name) VALUES(?)', [name]);
    return result;
};

const updateProduct = async ({ name, id }) => {
    const [result] = await connection.execute(`UPDATE products 
    SET name = ? WHERE id = ?`, [name, id]);
    return result;
};

const deleteProduct = async (id) => {
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};