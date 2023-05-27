const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { expect } = chai;
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSales, saleOne, newSale } = require('../../mocks/salesMock');

chai.use(chaiHttp);

describe('Sales unit tests', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Fetching all sales', async function () {
        sinon.stub(salesModel, 'getAllSales').resolves(allSales);
        const { data } = await salesService.getAllSales();
        expect(data).to.be.deep.equal(allSales);
    });

    it('Fetching a specific sale by ID', async function () {
        sinon.stub(salesModel, 'findSaleById').resolves(saleOne);
        const { data } = await salesService.findSaleById(1);
        expect(data).to.be.deep.equal(saleOne);
    });

    it('Creating a new sale', async function () {
        sinon.stub(salesModel, 'createSale').resolves(newSale);
        sinon.stub(salesModel, 'createSalesInfo').resolves();
        sinon.stub(productsModel, 'findProductById').resolves({ productId: 1 });
        const { data: { itemsSold } } = await salesService.createSale(newSale);
        expect(itemsSold).to.be.deep.equal(newSale);
    });
});