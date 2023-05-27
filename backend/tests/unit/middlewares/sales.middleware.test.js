const { expect } = require('chai');
const sinon = require('sinon');
const { validateNewSale } = require('../../../src/middlewares/validateSales');

describe('Sales unit tests', function () {
  afterEach(function () {
  sinon.restore();
});
  it('Testing a happy case', async function () {
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

//   it('Testing a happy case', async function () {
//     const req = { body: [{ productId: 1, quantity: 2 }] };
//     const res = {};
//     const next = sinon.stub().returns();
    
//     validateNewSale(req, res, next);
    
//     expect(next).to.have.been.calledWith();
//   });
});