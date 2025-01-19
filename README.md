## Projeto de gerenciamento de salas WEB2
Descrição do Projeto

A API desenvolvida é parte do projeto da disciplina de WEB2, cujo objetivo é implementar um sistema de gerenciamento de salas. A API é responsável por gerenciar laboratórios, autenticação de usuários e gerar relatórios em PDF.
#### Equipe:
- Zennon Sampaio
- Francisco da Cunha
- Phillipe Dantas

Tecnologias Utilizadas

- Node.js
- Express
- MongoDB Atlas
- JSON Web Token (JWT) para autenticação
- Multer para upload de arquivos
- PDFKit para geração de PDFs

## Rotas da API
Middleware de Segurança

**Middleware de Autenticação:**
Verifica se o token JWT é válido e permite acesso às rotas protegidas(/laboratorio/novo, /laboratorios/relatorio).

**Middleware de Horário:**
Permite o uso da API apenas de segunda à sexta-feira.
### 1. Autenticação
```
POST /api/logar
```
Autentica o usuário e retorna um token JWT.

Corpo da requisição:
```
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```
Resposta de sucesso:
```
{
  "token": "<jwt-token>"
}
```
Códigos de status:
```
200: Login realizado com sucesso

401: Credenciais inválidas
```
### 2. Criação de Laboratórios
```
POST /api/laboratorio/novo
```
Cadastra um novo laboratório.

Middleware: Requer token JWT retornado ao fazer autenticação(definir na requisição no headers como "Authorization") e aceita apenas uploads de segunda à sexta-feira.

Corpo da requisição: (com multipart/form-data para envio de arquivos)
```
{
  "name": "Laboratório 1",
  "description": "Laboratório equipado para aulas de química.",
  "capacity": 30,
  "picture": <arquivo-img>
}
```
Resposta de sucesso:
```
{
  "message": "Laboratório criado com sucesso",
  "lab": {
    "_id": "<id>",
    "name": "Laboratório 1",
    "description": "Laboratório equipado para aulas de química.",
    "capacity": 30,
    "picture": "uploads/<nome-do-arquivo>"
  }
}
```
Códigos de status:
```
201: Laboratório criado

400: Campos obrigatórios não preenchidos

401: Token JWT ausente ou inválido
```
### 3. Relatório
```
GET /api/laboratorios/relatorio
```
Gera e permite o download de um relatório em PDF com informações de todos os laboratórios cadastrados no banco de dados.

Middleware: Requer token JWT retornado ao fazer autenticação(definir na requisição no headers como "Authorization") e aceita apenas uploads de segunda à sexta-feira.

Resposta de sucesso: Arquivo PDF para download.

Códigos de status:
```
200: Relatório gerado

401: Token JWT ausente ou inválido

500: Erro interno ao gerar o relatório
```