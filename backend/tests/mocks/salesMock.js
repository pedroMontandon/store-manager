const allSales = [
  {
    saleId: 1,
    date: '2023-05-26T21:54:58.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-26T21:54:58.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-26T21:54:58.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleOne = {
  date: '2023-05-26T21:54:58.000Z',
  productId: 1,
  quantity: 5,
};

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = { allSales, saleOne, newSale };