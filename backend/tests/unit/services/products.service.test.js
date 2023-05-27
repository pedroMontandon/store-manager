const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { allProducts, newProduct } = require('../../mocks/productsMock');

describe('Product unit tests', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Fetching all products', async function () {
        sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);
        const { data } = await productsService.getAllProducts();
        expect(data).to.be.deep.equal(allProducts);
    });

    it('Fetching a specific product by ID', async function () {
        sinon.stub(productsModel, 'findProductById').resolves(allProducts[0]);
        const { data } = await productsService.findProductById(1);
        expect(data).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });

    it('Creating a new product', async function () {
        sinon.stub(productsModel, 'createProduct').resolves(newProduct);
        const { data } = await productsService.createProduct('Martelo do Chapolin');
        expect(data.name).to.be.deep.equal(newProduct[0].name);
    });
});