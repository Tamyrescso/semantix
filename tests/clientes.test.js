const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Clientes } = require('../src/models');
const app = require('../src/app');
const { clients, createClient, updateClient } = require('./mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Rota /clientes', () => {
  let chaiHttpResponse;
  describe('Testa a listagem de clientes', () => {
    before(async () => {
      sinon
        .stub(Clientes, 'findAll')
        .resolves(clients);
    })
    after(() => (Clientes.findAll).restore());
    it('Se retorna o status 200 e a listagem de clientes', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/clientes');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(clients)
    })
  })
  describe('Testa o cadastro de clientes', () => {
    before(async () => {
      sinon
        .stub(Clientes, 'create')
        .resolves(createClient);
    })
    after(() => (Clientes.create).restore());
    it('Se retorna o status 201 e o cliente cadastrado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/clientes')
      .send({
        "nome": "Michael Jackson",
        "email": "michael.mj@gmail.com",
        "telefone": "(72)8345-4554"
      });

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(createClient)
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie o campo nome', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/clientes')
      .send({
        "email": "michael.mj@gmail.com",
        "telefone": "(72)8345-4554"
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "nome is required"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie o campo telefone', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/clientes')
      .send({
        "nome": "Michael Jackson",
        "email": "michael.mj@gmail.com",
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "telefone is required"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso não envie o campo email', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/clientes')
      .send({
        "nome": "Michael Jackson",
        "telefone": "(72)8345-4554"
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "email is required"
      })
    })
  })
  describe('Testa a atualização no cadastro de clientes', () => {
    before(async () => {
      sinon
        .stub(Clientes, 'create')
        .resolves(updateClient);
    })
    after(() => (Clientes.create).restore());
    it('Se retorna o status 200 e o cliente atualizado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/clientes/2')
      .send({
        "nome": "Michael Schumacher",
        "email": "MichaelSchumacher@gmail.com",
        "telefone": "(24)0000-0000"
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(updateClient);
    })
    it('Se retorna o status 400 e a mensagem de erro caso envie o campo nome vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/clientes/2')
      .send({
        "nome": "",
        "email": "michael.mj@gmail.com",
        "telefone": "(72)8345-4554"
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "nome is not allowed to be empty"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso envie o campo telefone vazio', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/clientes/2')
      .send({
        "nome": "Michael Schumacher",
        "email": "michael.mj@gmail.com",
        "telefone": ""
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "telefone is not allowed to be empty"
      })
    })
    it('Se retorna o status 400 e a mensagem de erro caso o email seja inválido', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .put('/clientes/2')
      .send({
        "nome": "Michael Jackson",
        "email": "michael.mj@gmail",
        "telefone": "(72)8345-4554"
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "email must be valid"
      })
    })
  })
  describe('Testa a exclusão do cadastro de um cliente', () => {
    before(async () => {
      sinon
        .stub(Clientes, 'destroy')
        .resolves();
    })
    after(() => (Clientes.destroy).restore());
    it('Se retorna o status 204 e o cliente atualizado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .delete('/clientes/2');

      expect(chaiHttpResponse).to.have.status(204);
      expect(chaiHttpResponse.body).to.be.deep.equal({});
    })
  })
})