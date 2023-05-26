const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSales, saleOne } = require('../../mocks/salesMock');

describe('Teste de unidade do controller Sales', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Recuperar todas as vendas', async function () {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'getAllSales').resolves({ type: 200, data: allSales });

        await salesController.getAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Recuperar uma venda pelo ID', async function () {
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesService, 'findSaleById').resolves({ type: 200, data: saleOne });

        await salesController.findSaleById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleOne);
    });

    it('Procurar uma venda com id inexistente', async function () {
        const req = { params: { id: 171 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesService, 'findSaleById')
          .resolves({ type: 404, data: { message: 'Sale not found' } });
        
        await salesController.findSaleById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
});