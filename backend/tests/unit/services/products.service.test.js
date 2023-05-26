const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { allProducts } = require('../../mocks/productsMock');

describe('Teste de unidade do service Products', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Recuperar todos os produtos', async function () {
        sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);
        const { data } = await productsService.getAllProducts();
        expect(data).to.be.deep.equal(allProducts);
    });

    it('Recuperar um produto pelo ID', async function () {
        sinon.stub(productsModel, 'findProductById').resolves(allProducts[0]);
        const { data } = await productsService.findProductById(1);
        expect(data).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });
});