const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOSTNAME,
    database: process.env.MYSQL_DATABASE || 'StoreManager',
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = connection;