# Clean Url Shortener

## O que é?

Uma API REST que provê o serviço de encurtar URLs.

## Qual a finalidade?

Aplicar, através de uma ideia simples, os conceitos da Clean Architecture e princípios como SOLID, DRY, TDD entre outros para estruturar uma API em Node.js.

## Principais tecnologias utilizadas:

- Docker
- PostgreSQL
- Node.js (v18+)
- Express
- Knex
- Jest
- Husky
- Eslint & Prettier
- Commitlint

## Documentação

Para compreender em detalhes o funcionamento da API, [verifique a documentação](./docs/index.md).

## Como Começar?

1. Clonar o repositório:

```text
git clone https://github.com/fliras/clean-url-shortener.git
```

2. Instalar as dependências:

```
npm install
```

3. Iniciar o container do Banco de Dados:

```
npm run db:up

Obs:
- É necessário instalar o Docker previamente;
- O banco de dados utilizado é PostgreSQL;
- Para acessar o banco de dados, abra o pgadmin em http://localhost:8080
- o usuário e senha para acesso estão disponíveis no docker file
```

4. Preparar o projeto:

```
npm run config

obs: serão configurados o husky e as migrations do bd
```

5. Iniciar a API (modo de desenvolvimento):

```
npm run dev
```

6. Comandos Adicionais:

```
// finaliza o container do bd
npm run db:down

// executar as migrations do banco de dados
npm run migrate

// executa todos os testes unitários
npm run test

// executa os testes unitários dos arquivos alterados
npm run test:staged

// acompanha os testes unitários dos arquivos alterados
npm run test:watch

// exibe a cobertura dos testes unitários
npm run test:coverage
```
