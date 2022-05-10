#  Semantix
## Code Challenge Back-end

## Resumo
Desenvolvimento de uma API para gerenciamento de compras, produtos e clientes.
A aplicação é capaz de listar, cadastrar, atualizar e deletar um produto, cliente e compra, filtrar as compras por cliente e listar as compras de um cliente por dia, mês ou ano.
Além disso, o estoque de produtos é alterado ao criar uma nova compra, atualizar a compra ou excluir.

![modelagem banco de dados](https://github.com/Tamyrescso/semantix/blob/main/images/bd.png)


## Especificações técnicas
 - API desenvolvida em NodeJS com a ORM sequelize
 - Banco de dados hospedado no Supabase
 - Endpoint acessível através de deploy no Heroku
 - Foram desenvolvidos testes de integração utilizando Mocha, Chai e Sinon

![cobertura dos testes](https://github.com/Tamyrescso/semantix/blob/main/images/cobertura.png)

## Como utilizar

 ##### Fazendo requisições diretamente para o endpoint (próximo tópico) com deploy no heroku e banco de dados no supabase.
 ##### Ou localmente, seguindo esses passos:
 - No terminal rode`git clone git@github.com:Tamyrescso/semantix.git`
 - Na pasta raiz rode `npm install`
 - Crie um arquivo `.env`
 - Coloque as variáveis de conexão com o seu banco de dados, seguindo o padrão dos nomes de variáveis contidas no arquivo /config/config.js
 - Crie um variável de ambiente PORT caso você use uma porta específica para rodar a API ou não crie e ela será rodada na porta 3000 por default.
 - Crie o banco de dados com o comando `npx sequelize db:create`
 - Crie as tabelas com o comando `npx sequelize db:migrate`
 - Popule as tabelas com o comando `npx sequelize db:seed:all`
 - Rode o server com o comando `npm start` ou `npm run dev`

## Endpoints e retornos
Endpoint base: `https://semantix-challenge-tamyres.herokuapp.com/`

## Clientes
 - **GET `https://semantix-challenge-tamyres.herokuapp.com/clientes`** 	Retorna lista de clientes contendo id, nome, email e telefone
 
 - **POST `https://semantix-challenge-tamyres.herokuapp.com/clientes`** Cria um cadastro para um novo cliente e retorna o cadastro criado junto com o novo id.
A requisição deverá ser feita em JSON no seguinte formato:
 
        	 "nome": "nome cliente",
        	 "email": "email válido",
        	 "telefone": "número de telefone"
 - **PUT `https://semantix-challenge-tamyres.herokuapp.com/clientes/:id`** Altera um cadastro de cliente e retorna os dados dele já atualizados.
O id do cliente a ser alterado deverá ser passado por parâmetro no endpoint e a requisição deverá ser feita em JSON no seguinte formato:
 
        	 "nome": "nome cliente",
        	 "email": "email válido",
        	 "telefone": "número de telefone"
           
 - **DELETE `https://semantix-challenge-tamyres.herokuapp.com/clientes/:id`** Deleta um cadastro de cliente e não retorna corpo na resposta.
O id do cliente a ser deletado deverá ser passado por parâmetro no endpoint.

## Produtos
 - **GET `https://semantix-challenge-tamyres.herokuapp.com/produtos`** 	Retorna lista de produtos contendo id, nome, quantidade no estoque e preço.
 
 - **POST `https://semantix-challenge-tamyres.herokuapp.com/produtos`** Cria um cadastro para um novo produto e retorna o cadastro criado junto com o novo id.
 A requisição deverá ser feita em JSON no seguinte formato:

	```
          "nome": "nome produto",
          "quantidadeEstoque": 50,
          "preço": 400.00

	```

 - **PUT `https://semantix-challenge-tamyres.herokuapp.com/produtos/:id`** Altera um cadastro de produto e retorna os dados dele já atualizados.
O id do produto a ser alterado deverá ser passado por parâmetro no endpoint e a requisição deverá ser feita em JSON no seguinte formato:


	```
          "nome": "nome produto",
          "quantidadeEstoque": 50,
          "preço": 400.00

	```
  
 - **DELETE `https://semantix-challenge-tamyres.herokuapp.com/produtos/:id`** Deleta um cadastro de produto e não retorna corpo na resposta.
O id do produto a ser deletado deverá ser passado por parâmetro no endpoint.

## Compras
 - **GET `https://semantix-challenge-tamyres.herokuapp.com/compras`** 	Retorna uma lista de compras completa, contendo: id da compra, quando foi criada e atualizada, o id do cliente que realizou a compra e as informações dele (nome, email, telefone) e retorna os produtos que compõem a compra junto com as informações de cada produto (id, nome, preço, quantidade comprada).
 - **GET `https://semantix-challenge-tamyres.herokuapp.com/compras/cliente/:id`** 	Retorna uma lista de compras completa baseada em um cliente com seu id passado por parâmetro, isto é, todas as compras que um cliente específico já fez.
 Retorna: id da compra, quando foi criada e atualizada, o id do cliente que realizou a compra e as informações dele (nome, email, telefone) e retorna os produtos que compõem a compra junto com as informações de cada produto (id, nome, preço, quantidade comprada).
 - **GET `https://semantix-challenge-tamyres.herokuapp.com/compras/cliente/:id/:dateFormat?q=`** 	Filtra as compras de um cliente específico baseado na data que ela foi realizada.
É preciso passar o id do cliente e o formato que deseja buscar seja: day, month or year. Exemplos:

	`https://semantix-challenge-tamyres.herokuapp.com/compras/cliente/1/day?q=6`

	`https://semantix-challenge-tamyres.herokuapp.com/compras/cliente/2/month?q=5`

	`https://semantix-challenge-tamyres.herokuapp.com/compras/cliente/3/year?q=2011`

	 Retorna: id da compra, quando foi criada e atualizada, o id do cliente que realizou a compra e as informações dele (nome, email, telefone) e retorna os produtos que compõem a compra junto com as informações de cada produto (id, nome, preço, quantidade comprada).
 
 - **POST `https://semantix-challenge-tamyres.herokuapp.com/compras`** Cria uma nova compra e retorna o id dessa nova compra junto com o id do cliente que realizou a compra e as datas de criação e atualização. 
 A requisição deverá ser feita em JSON no seguinte formato:
 
	```
          "clienteId": 2,
          "compras": [
            { "produtoId": 1, "quantidade": 5 },
            { "produtoId": 2, "quantidade": 10 }
         ]

	```
  
	O id do cliente e de cada produto deverá ser um id já existente e cadastrado.
	Obs.: esse endpoint irá reduzir do estoque a quantidade de cada produto comprado.

 - **PUT `https://semantix-challenge-tamyres.herokuapp.com/compras/:id`** Altera uma compra e retorna o id dessa nova compra junto com o id do cliente que realizou a compra e as datas de criação e atualização. 
 O id do produto a ser alterado deverá ser passado por parâmetro no endpoint e a requisição deverá ser feita em JSON no seguinte formato:
 

	```
          "nome": "nome produto",
          "quantidadeEstoque": 50,
          "preço": 400.00

	```
  
O id do cliente e de cada produto deverá ser um id já existente e cadastrado.
Obs.: esse endpoint irá substituir a compra anterior por essa baseado no id da compra, alterando assim, as quantidades de cada produto no estoque.
 - **DELETE `https://semantix-challenge-tamyres.herokuapp.com/compras/:id`** Deleta uma compra e não retorna corpo na resposta.
O id do produto a ser deletado deverá ser passado por parâmetro no endpoint.

##  Pontos a serem implementados ou melhorados

 - Listar de forma ordenada os produtos mais vendidos por dia, mês e ano.
 - Listar de forma ordenada os clientes que mais gastam por dia, mês e ano.
 - Finalizar testes de integração e corrigir alguns.
 - Fazer testes unitários.
 - Controlar limite de venda para produto não chegar a 0 no estoque
 - Melhorar validações, utilizar o Joi.
 - Refatorar service de compras.

	
