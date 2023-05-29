const { expect } = require('chai');
const sinon = require('sinon');
const { validateNewSale, validateSaleUpdate } = require('../../../src/middlewares/validateSales');

describe('Sales unit tests', function () {
  afterEach(function () {
  sinon.restore();
});
  it('Testing a happy case finding a sale', async function () {
    const req = { body: [{ productId: 1, quantity: 2 }] };
    const res = {};
    const next = sinon.stub().returns();
    
    validateNewSale(req, res, next);
    
    expect(next).to.have.been.calledWith();
  });

  it('Trying to fetch without a productId', async function () {
    const req = { body: [{ productId: '', quantity: 2 }] };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    validateNewSale(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Trying to fetch without a quantity', async function () {
    const req = { body: [{ productId: 1, quantity: '' }] };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    validateNewSale(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Trying to fetch with 0 quantity', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    validateNewSale(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
    .calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testing a happy case updating a sale', async function () {
    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 10 } };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    validateSaleUpdate(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Trying to update a sale without a quantity', async function () {
    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: '' } };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    validateSaleUpdate(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Trying to update with 0 quantity', async function () {
    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 0 } };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    validateSaleUpdate(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
    .calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
});