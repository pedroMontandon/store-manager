const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSales, saleOne } = require('../../mocks/salesMock');
const { productNotFound } = require('../../../src/utils/errorMap');
const { newSale } = require('../../mocks/salesMock');

describe('Testing sales unit', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Fetching all sales', async function () {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'getAllSales').resolves({ type: 200, data: allSales });

        await salesController.getAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Fetching a specific sale by ID', async function () {
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesService, 'findSaleById').resolves({ type: 200, data: saleOne });

        await salesController.findSaleById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleOne);
    });

    it('Fetching sale by an incorrect ID', async function () {
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

    it('Creating a sale without productId', async function () {
        const req = { body: [{ productId: '', quantity: 8 }] };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesService, 'createSale').resolves(productNotFound);

        await salesController.createSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Creating a sale using an incorrect productId', async function () {
        const req = { body: [{ productId: 171, quantity: 8 }] };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesService, 'createSale').resolves(productNotFound);

        await salesController.createSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Creating a happy sale', async function () {
        const req = { body: [{ productId: '', quantity: 8 }] };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesService, 'createSale').resolves({ type: 201, data: newSale });

        await salesController.createSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newSale);
    });

    it('Deleting a sale happily', async function () {
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(salesService, 'deleteSale').resolves({ type: 204, data: newSale });

        await salesController.deleteSale(req, res);

        expect(res.status).to.have.been.calledWith(204);
    });

    it('Trying to delete a sale without an id', async function () {
        const req = { params: { id: 171 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(salesService, 'deleteSale')
        .resolves({ type: 404, data: { message: 'Sale not found' } });

        await salesController.deleteSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
});