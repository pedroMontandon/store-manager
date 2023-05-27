const { expect } = require('chai');
const sinon = require('sinon');
const { validateNewProduct } = require('../../../src/middlewares/validateProducts');

describe('Products unit tests', function () {
  afterEach(function () {
    sinon.restore();
});
  it('Testing a happy case', async function () {
    const req = { body: { name: 'Chapolins Hammer' } };
    const res = {};
    const next = sinon.stub().returns();
    validateNewProduct(req, res, next);
    
    expect(next).to.have.been.calledWith();
  });
  it('Testing a req without name', async function () {
    const req = { body: { name: '' } };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    validateNewProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Testing a req with less than 5 characters', async function () {
    const req = { body: { name: 'Box' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub().returns();
    validateNewProduct(req, res, next);
    
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
    .calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});