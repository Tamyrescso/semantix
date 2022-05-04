const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Compras } = require('../src/models');
const app = require('../src/app');
const { orders, updateOrder, orderByClient } = require('./mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Rota /compras', () => {
  let chaiHttpResponse;
  describe('Testa a listagem de compras realizadas', () => {
    before(async () => {
      sinon
        .stub(Compras, 'findAll')
        .resolves(orders);
    })
    after(() => (Compras.findAll).restore());
    it('Se retorna o status 200 e a listagem de compras realizadas', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/compras');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(orders)
    })
  })
  describe('Testa erros no cadastro de compras', () => {
    before(async () => {
      sinon
        .stub(Compras, 'create')
        .resolves(orders);
    })
    after(() => (Compras.create).restore());
    it('Se retorna o status 400 e a mensagem de erro caso envie o campo compras vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/compras')
      .send({
        "clienteId": 2,
        "compras": ""
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "compras is not allowed to be empty"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie um number no campo clientId', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/compras')
      .send({
        "clienteId": "2",
        "compras": [{ "produtoId": 1,"quantidade": 10 }, { "produtoId": 2,"quantidade": 5 }]
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "clienteId must be a number"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie um number em qualquer campo produtoId', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/compras')
      .send({
        "clienteId": 2,
        "compras": [{ "produtoId": 1,"quantidade": 10 }, { "produtoId": "2","quantidade": 5 }]
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "produtoId must be a number"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie um number em qualquer campo quantidade', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/compras')
      .send({
        "clienteId": 2,
        "compras": [{ "produtoId": 1,"quantidade": "10" }, { "produtoId": 2,"quantidade": 5 }]
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "quantidade must be a number"
      })
    })
    it('Se retorna o status 404 e a mensagem de erro caso o cliente da compra não seja registrado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/compras')
      .send({
        "clienteId": 233,
        "compras": [{ "produtoId": 1,"quantidade": 10 }, { "produtoId": 2,"quantidade": 5 }]
      });

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "Client doesn't exist"
      })
    })
    it('Se retorna o status 404 e a mensagem de erro caso algum produto da compra não seja registrado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/compras')
      .send({
        "clienteId": 2,
        "compras": [{ "produtoId": 123,"quantidade": 10 }, { "produtoId": 2,"quantidade": 5 }]
      });

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "Product doesn't exist"
      })
    })
  })
  describe('Testa a atualização no cadastro de compras', () => {
    before(async () => {
      sinon
        .stub(Compras, 'update')
        .resolves(updateOrder);
    })
    after(() => (Compras.update).restore());
    it('Se retorna o status 200 e a compra atualizada', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/compras/2')
      .send({
        "clienteId": 2,
        "compras": [{ "produtoId": 2,"quantidade": 10 }]
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(updateOrder);
    })
  })
  describe('Testa a exclusão do cadastro de uma compra', () => {
    before(async () => {
      sinon
        .stub(Compras, 'destroy')
        .resolves();
    })
    after(() => (Compras.destroy).restore());
    it('Se retorna o status 204 e o corpo vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .delete('/compras/2');

      expect(chaiHttpResponse).to.have.status(204);
      expect(chaiHttpResponse.body).to.be.deep.equal({});
    })
  })
  describe('Testa a procura de compras filtradas por clientes', () => {
    before(async () => {
      sinon
        .stub(Compras, 'findAll')
        .resolves(orderByClient);
    })
    after(() => (Compras.findAll).restore());
    it('Se retorna o status 200 e as compras filtradas por cliente', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/compras/cliente/1');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(orderByClient);
    })
  })
})