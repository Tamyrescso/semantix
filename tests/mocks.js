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
  "id": 3,
  "nome": "Escudo do Capitão América",
  "quantidadeEstoque": 50,
  "preço": "400.00"
};


const orders = [
	{
		"id": 1,
		"createdAt": "2011-08-01T19:58:00.000Z",
		"updatedAt": "2022-05-03T21:07:38.866Z",
		"cliente": {
			"id": 2,
			"nome": "Michael Schumacher",
			"email": "MichaelSchumacher@gmail.com",
			"telefone": "(24)0000-0000"
		},
		"produtos": [
			{
				"id": 2,
				"nome": "Traje de encolhimento",
				"preço": "300.00",
				"ComprasProdutos": {
					"quantidade": 10
				}
			},
			{
				"id": 3,
				"nome": "Escudo do Capitão América",
				"preço": "400.00",
				"ComprasProdutos": {
					"quantidade": 5
				}
			},
			{
				"id": 1,
				"nome": "Martelo do Thor",
				"preço": "500.00",
				"ComprasProdutos": {
					"quantidade": 10
				}
			}
		]
	},
	{
		"id": 2,
		"createdAt": "2011-04-01T19:58:00.000Z",
		"updatedAt": null,
		"cliente": {
			"id": 2,
			"nome": "Michael Schumacher",
			"email": "MichaelSchumacher@gmail.com",
			"telefone": "(24)0000-0000"
		},
		"produtos": [
			{
				"id": 1,
				"nome": "Martelo do Thor",
				"preço": "500.00",
				"ComprasProdutos": {
					"quantidade": 2
				}
			}
		]
	},
	{
		"id": 3,
		"createdAt": "2010-03-01T19:58:00.000Z",
		"updatedAt": null,
		"cliente": {
			"id": 1,
			"nome": "Lewis Hamilton",
			"email": "lewishamilton@gmail.com",
			"telefone": "(45)95876-5434"
		},
		"produtos": [
			{
				"id": 2,
				"nome": "Traje de encolhimento",
				"preço": "300.00",
				"ComprasProdutos": {
					"quantidade": 5
				}
			}
		]
	},
	{
		"id": 4,
		"createdAt": "2022-05-03T20:37:06.924Z",
		"updatedAt": "2022-05-03T20:37:06.924Z",
		"cliente": {
			"id": 2,
			"nome": "Michael Schumacher",
			"email": "MichaelSchumacher@gmail.com",
			"telefone": "(24)0000-0000"
		},
		"produtos": [
			{
				"id": 2,
				"nome": "Traje de encolhimento",
				"preço": "300.00",
				"ComprasProdutos": {
					"quantidade": 2
				}
			}
		]
	}
];

const updateOrder = {
    "id": 2,
    "clienteId": 2,
    "createdAt": "2011-04-01T19:58:00.000Z",
    "updatedAt": "2011-04-01T19:58:00.000Z",
};

const orderByClient = [
	{
		"id": 1,
		"createdAt": "2011-08-01T19:58:00.000Z",
		"updatedAt": null,
		"cliente": {
			"id": 1,
			"nome": "Lewis Hamilton",
			"email": "lewishamilton@gmail.com",
			"telefone": "(45)95876-5434"
		},
		"produtos": [
			{
				"id": 2,
				"nome": "Traje de encolhimento",
				"preço": "300.00",
				"ComprasProdutos": {
					"quantidade": 10
				}
			},
			{
				"id": 3,
				"nome": "Escudo do Capitão América",
				"preço": "400.00",
				"ComprasProdutos": {
					"quantidade": 5
				}
			}
		]
	},
	{
		"id": 3,
		"createdAt": "2010-03-01T19:58:00.000Z",
		"updatedAt": null,
		"cliente": {
			"id": 1,
			"nome": "Lewis Hamilton",
			"email": "lewishamilton@gmail.com",
			"telefone": "(45)95876-5434"
		},
		"produtos": [
			{
				"id": 2,
				"nome": "Traje de encolhimento",
				"preço": "300.00",
				"ComprasProdutos": {
					"quantidade": 5
				}
			}
		]
	}
];

module.exports = {
  clients,
  createClient,
  updateClient,
  products,
  createProduct,
  updateProduct,
  orders,
  updateOrder,
  orderByClient
}