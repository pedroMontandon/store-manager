const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const { allSales, saleOne, newSale } = require('../../mocks/salesMock');

describe('Teste de unidade do model Sales', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Recuperar todos as sales', async function () {
        sinon.stub(connection, 'execute').resolves([allSales]);
        const result = await salesModel.getAllSales();
        expect(result).to.be.deep.equal(allSales);
    });

    it('Recuperar um produto pelo ID', async function () {
        sinon.stub(connection, 'execute').resolves([saleOne]);
        const result = await salesModel.findSaleById(1);
        expect(result).to.be.deep.equal(saleOne);
    });

    it('Adding a new sale to the table', async function () {
        sinon.stub(connection, 'execute').resolves([newSale]);
        const result = await salesModel.createSale(newSale);
        expect(result).to.be.deep.equal(newSale);
    });
});