const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSales, saleOne } = require('../../mocks/salesMock');

describe('Teste de unidade do service Sales', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Recuperar todos os produtos', async function () {
        sinon.stub(salesModel, 'getAllSales').resolves(allSales);
        const { data } = await salesService.getAllSales();
        expect(data).to.be.deep.equal(allSales);
    });

    it('Recuperar uma venda pelo ID', async function () {
        sinon.stub(salesModel, 'findSaleById').resolves(saleOne);
        const { data } = await salesService.findSaleById(1);
        expect(data).to.be.deep.equal(saleOne);
    });
});