const express = require('express');
const { productsRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

//
//
// Build a Wall!!
//
// não remova esse endpoint, é para o avaliador funcionar

app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
