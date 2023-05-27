const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { allProducts, newProduct } = require('../../mocks/productsMock');

describe('Products models unit tests', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Fetching all products', async function () {
        sinon.stub(connection, 'execute').resolves([allProducts]);
        const result = await productsModel.getAllProducts();
        expect(result).to.be.deep.equal(allProducts);
    });
    it('Fetching a specific product by ID', async function () {
        sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
        const result = await productsModel.findProductById(1);
        expect(result).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });

    it('Adding a product to the table products', async function () {
        sinon.stub(connection, 'execute').resolves([[newProduct[0]]]);
        const result = await productsModel.createProduct(newProduct.name);
        expect(result).to.be.deep.equal(newProduct);
    });
});