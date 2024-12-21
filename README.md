
# API REST para Gerenciamento de Seleções

Este projeto é uma **API REST** construída com **Node.js**, **Express** e **MySQL** para gerenciar seleções de futebol. A API fornece endpoints para listar, buscar, adicionar, atualizar e excluir seleções no banco de dados.

---

## 🚀 Funcionalidades

- Listar todas as seleções.
- Buscar uma seleção específica pelo ID.
- Adicionar uma nova seleção.
- Atualizar informações de uma seleção existente.
- Excluir uma seleção do banco de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **MySQL**: Banco de dados relacional.
- **Jest**: Framework de testes.
- **Supertest**: Biblioteca para testar APIs.

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- **Node.js** (versão 16 ou superior).
- **MySQL** instalado e rodando.

---

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/ItamarJuniorDEV/api-rest-selecoes.git
   cd api-rest-selecoes
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados**:
   - Crie um banco de dados chamado `bdcopa` no MySQL.
   - Configure as credenciais no arquivo `.env` (veja mais abaixo como usar variáveis de ambiente).

4. **Crie a tabela `selecoes`**:
   Execute o seguinte script SQL para criar a tabela necessária:
   ```sql
   CREATE TABLE selecoes (
       id INT AUTO_INCREMENT PRIMARY KEY,
       selecao VARCHAR(255) NOT NULL,
       grupo VARCHAR(10) NOT NULL
   );
   ```

5. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

   O servidor estará disponível em: `http://localhost:3000`.

---

## 📖 Endpoints da API

### 1. **Listar todas as seleções**
- **Rota**: `GET /selecoes`
- **Exemplo de Resposta**:
  ```json
  [
      {
          "id": 1,
          "selecao": "Brasil",
          "grupo": "G"
      },
      {
          "id": 2,
          "selecao": "Argentina",
          "grupo": "F"
      }
  ]
  ```

---

### 2. **Buscar uma seleção por ID**
- **Rota**: `GET /selecoes/:id`
- **Exemplo de Resposta**:
  ```json
  {
      "id": 1,
      "selecao": "Brasil",
      "grupo": "G"
  }
  ```

---

### 3. **Adicionar uma nova seleção**
- **Rota**: `POST /selecoes`
- **Corpo da Requisição**:
  ```json
  {
      "selecao": "França",
      "grupo": "E"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
      "mensagem": "Seleção cadastrada com sucesso!",
      "data": {
          "id": 3
      }
  }
  ```

---

### 4. **Atualizar uma seleção por ID**
- **Rota**: `PUT /selecoes/:id`
- **Corpo da Requisição**:
  ```json
  {
      "selecao": "Alemanha",
      "grupo": "H"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
      "mensagem": "Seleção com ID 3 atualizada com sucesso!"
  }
  ```

---

### 5. **Excluir uma seleção por ID**
- **Rota**: `DELETE /selecoes/:id`
- **Exemplo de Resposta**:
  ```json
  {
      "mensagem": "Seleção com ID 3 excluída com sucesso!"
  }
  ```

---

## 🧪 Testes Automatizados

Os testes foram implementados com **Jest** e **Supertest** para validar os endpoints da API.

### Como executar os testes:

1. Certifique-se de que o banco de dados está rodando.
2. Execute o comando:
   ```bash
   npm test
   ```

### Resultado esperado:
- Todos os testes devem passar com sucesso:
  ```bash
  PASS  tests/app.test.js
    API de Seleções
      ✓ Deve listar todas as seleções (GET /selecoes)
      ✓ Deve criar uma nova seleção (POST /selecoes)
      ✓ Deve buscar uma seleção por ID (GET /selecoes/:id)
      ✓ Deve atualizar uma seleção por ID (PUT /selecoes/:id)
      ✓ Deve excluir uma seleção por ID (DELETE /selecoes/:id)
  ```

---

## 🔒 Protegendo as Credenciais do Banco de Dados

Para esconder as credenciais do banco de dados, utilize o pacote **dotenv** para gerenciar variáveis de ambiente.

1. Instale o dotenv:
   ```bash
   npm install dotenv
   ```

2. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   DB_HOST=localhost
   DB_PORT=3307
   DB_USER=root
   DB_PASSWORD=rootadmin
   DB_DATABASE=bdcopa
   ```

3. Atualize o arquivo `infra/conexao.js` para usar o dotenv:
   ```javascript
   import mysql from 'mysql2';
   import dotenv from 'dotenv';

   dotenv.config();

   const conexao = mysql.createConnection({
       host: process.env.DB_HOST,
       port: process.env.DB_PORT,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_DATABASE
   });

   conexao.connect(err => {
       if (err) {
           console.error('Erro ao conectar ao banco de dados:', err.message);
           process.exit(1);
       } else {
           console.log('Conexão com o banco de dados estabelecida com sucesso!');
       }
   });

   export default conexao;
   ```

4. Adicione o arquivo `.env` ao `.gitignore` para que ele não seja enviado ao repositório:
   ```
   .env
   ```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adiciona minha feature'
   ```
4. Faça o push para sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🧑‍💻 Autor

- **Itamar Alves Ferreira Junior**
- [GitHub](https://github.com/ItamarJuniorDEV)
- [LinkedIn](https://www.linkedin.com/in/itamar-junior-b24006237/)

---
