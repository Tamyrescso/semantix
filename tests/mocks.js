const clients = [
  {
    "id": 1,
    "nome": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "telefone": "(45)95876-5434"
  },
  {
    "id": 2,
    "nome": "Michael Schumacher",
    "email": "MichaelSchumacher@gmail.com",
    "telefone": "(24)2345-9485"
  }
];

const createClient = {
  "id": 3,
  "nome": "Michael Jackson",
  "email": "michael.mj@gmail.com",
  "telefone": "(72)8345-4554"
};

const updateClient = {
	"id": 2,
	"nome": "Michael Schumacher",
	"email": "MichaelSchumacher@gmail.com",
	"telefone": "(24)0000-0000"
}

const products = [
	{
		"id": 2,
		"nome": "Traje de encolhimento",
		"quantidadeEstoque": 26,
		"preço": "300.00"
	},
	{
		"id": 3,
		"nome": "Escudo do Capitão América",
		"quantidadeEstoque": 35,
		"preço": "400.00"
	},
	{
		"id": 1,
		"nome": "Martelo do Thor",
		"quantidadeEstoque": 0,
		"preço": "500.00"
	}
];

const createProduct = {
	"id": 4,
	"nome": "Capa da invisibilidade",
	"quantidadeEstoque": 50,
	"preço": "400.00"
};

const updateProduct = {
  "id": 2,
  "nome": "Traje de encolhimento",
  "quantidadeEstoque": 26,
  "preço": "300.00"
};

module.exports = {
  clients,
  createClient,
  updateClient,
  products,
  createProduct,
  updateProduct
}