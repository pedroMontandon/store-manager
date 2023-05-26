const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { allProducts } = require('../../mocks/productsMock');

describe('Teste de unidade do model Products', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Recuperar todos os produtos', async function () {
        sinon.stub(connection, 'execute').resolves([allProducts]);
        const result = await productsModel.getAllProducts();
        expect(result).to.be.deep.equal(allProducts);
    });
    it('Recuperar um produto pelo ID', async function () {
        sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
        const result = await productsModel.findProductById(1);
        expect(result).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });
});