const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Produtos } = require('../src/models');
const app = require('../src/app');
const { products, createProduct, updateProduct } = require('./mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Rota /produtos', () => {
  let chaiHttpResponse;
  describe('Testa a listagem de produtos', () => {
    before(async () => {
      sinon
        .stub(Produtos, 'findAll')
        .resolves(products);
    })
    after(() => (Produtos.findAll).restore());
    it('Se retorna o status 200 e a listagem de produtos', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/produtos');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(products)
    })
  })
  describe('Testa o cadastro de produtos', () => {
    before(async () => {
      sinon
        .stub(Produtos, 'create')
        .resolves(createProduct);
    })
    after(() => (Produtos.create).restore());
    it('Se retorna o status 201 e o produto cadastrado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/produtos')
      .send({
        "nome": "Capa da invisibilidade",
        "quantidadeEstoque": 50,
        "preço": 400.00
      });

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(createProduct)
    })
    it('Se retorna o status 400 e a mensagem de erro caso envie o campo nome vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/produtos')
      .send({
        "nome": "",
        "quantidadeEstoque": 50,
        "preço": 400.00
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "nome is not allowed to be empty"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie um number no campo quantidadeEstoque', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/produtos')
      .send({
        "nome": "Capa da invisibilidade",
        "quantidadeEstoque": "50",
        "preço": 400.00
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "quantidadeEstoque must be a number"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie um number no campo preço', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/produtos')
      .send({
        "nome": "Capa da invisibilidade",
        "quantidadeEstoque": 50,
        "preço": "400.00"
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "preço must be a number"
      })
    })
    it('Se retorna o status 409 e a mensagem de erro caso o produto já exista', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/produtos')
      .send({
        "nome": "Escudo do Capitão América",
        "quantidadeEstoque": 35,
        "preço": 400.00
    });

      expect(chaiHttpResponse).to.have.status(409);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Product already registered' })
    })
  })
  describe('Testa a atualização no cadastro de produtos', () => {
    before(async () => {
      sinon
        .stub(Produtos, 'update')
        .resolves(updateProduct);
    })
    after(() => (Produtos.update).restore());
    it('Se retorna o status 200 e o produto atualizado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/produtos/3')
      .send({
        "nome": "Escudo do Capitão América",
        "quantidadeEstoque": 50,
        "preço": 400.00
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(updateProduct);
    })
    it('Se retorna o status 400 e a mensagem de erro caso envie o campo nome vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/produtos/2')
      .send({
        "nome": "",
        "quantidadeEstoque": 26,
        "preço": "300.00"
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "nome is not allowed to be empty"
      })
    })
  })
  describe('Testa a exclusão do cadastro de um produto', () => {
    before(async () => {
      sinon
        .stub(Produtos, 'destroy')
        .resolves();
    })
    after(() => (Produtos.destroy).restore());
    it('Se retorna o status 204 e o corpo vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .delete('/produtos/2');

      expect(chaiHttpResponse).to.have.status(204);
      expect(chaiHttpResponse.body).to.be.deep.equal({});
    })
  })
})