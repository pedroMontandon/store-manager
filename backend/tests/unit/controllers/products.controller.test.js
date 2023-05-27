const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { allProducts, newProduct } = require('../../mocks/productsMock');

describe('Teste de unidade do controller Products', function () {
  afterEach(function () {
      sinon.restore();
  });
  it('Recuperar todos os produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'getAllProducts').resolves({ type: 200, data: allProducts });
      
      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Recuperar um produto pelo ID', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'findProductById')
        .resolves({ type: 200, data: allProducts[0] });

      await productsController.findProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
  });
  
  it('Procurar por um Id inexistente', async function () {
      const req = { params: { id: 171 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'findProductById')
        .resolves({ type: 404, data: { message: 'Product not found' } });
      
      await productsController.findProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Criando um novo produto', async function () {
      const req = { body: { name: 'Martelo do Chapolin' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'createProduct').resolves({ type: 201, data: newProduct });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Criando um produto sem nome', async function () {
      const req = { body: { name: '' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'createProduct')
        .resolves({ type: 400, data: { message: '"name" is required' } });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Criando um produto com tamanho do name menor que 5', async function () {
    const req = { body: { name: 'Bob' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(productsService, 'createProduct')
    .resolves({ type: 422, data: { message: '"name" length must be at least 5 characters long' } });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
    .calledWith({ message: '"name" length must be at least 5 characters long' });
});
});