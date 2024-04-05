## Asset monitoring control

Project created to assist in the control of tools and cars allocated to each construction site/city in order to assist in business management.

## Stack used

**Front-end:** Next, TailwindCSS

**Back-end:** Node, Express, MongoDb

## Environment variables

To run this project you will need to add the following environment variables to your .env

`SECRET_JWT`
`PORT`
`NODE_MAILER_USER`
`NODE_MAILER_PASS`
`NODE_MAILER_PORT`
`NODE_MAILER_HOST`
`MONGO_URL`
`MONGO_USERNAME`
`MONGO_PASSWORD`
`MONGO_DB`

## 🚀 About me

I'm 24 years old, Christian, guitarist/worshipper and passionate about Front-End Development. Lately I have been studying a lot about Back-End, I hope one day to have enough knowledge to proclaim myself a Full-Stack Developer.

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-next-js-jade.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/oguuiholiv/)
[![twitter](https://img.shields.io/badge/insta-1DA1F2?style=for-the-badge&logo=instagram&logoColor)](https://www.instagram.com/ooguuiholiv/)

## 🚀 Languages and tools:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Installation

Install controle-de-patrimonio with npm

```bash
  git clone https://github.com/ooguuiholiv/controle-de-patrimonio.git
  cd controle-de-patrimonio
  npm install
  touch .env
  // Remember to enter the data for your environment variables.
  npm run dev
```

## API documentation

<details>
<summary>Documentação das rotas de usuário</summary>

#### Cadastrar um usuário

```http
  POST /register/users
```

| Parâmetro                                            | Tipo     | Descrição                                       |
| :--------------------------------------------------- | :------- | :---------------------------------------------- |
| `first_name, last_name, cpf, phone, email, password` | `string` | **Obrigatório estar autenticado na aplicação**. |

#### Retorna todos os usuários do sistema

```http
  GET /list/users
```

| Parâmetro | Tipo     | Descrição                                       |
| :-------- | :------- | :---------------------------------------------- |
| `null`    | `string` | **Obrigatório estar autenticado na aplicação**. |

#### Atualiza dados do usuário logado

```http
  PUT /update/user
```

| Parâmetro                           | Tipo     | Descrição                                       |
| :---------------------------------- | :------- | :---------------------------------------------- |
| `first_name, last_name, cpf, phone` | `string` | **Obrigatório estar autenticado na aplicação**. |

#### Inativa um usuário

```http
  DELETE /inative/users/:userId
```

| Parâmetro | Tipo     | Descrição                                                                              |
| :-------- | :------- | :------------------------------------------------------------------------------------- |
| `userId`  | `string` | **Obrigatório estar autenticado na aplicação**. Passar id do usuário que quer inativar |

#### Solicita um link de redefinição de senha

```http
  PATCH /user/forgot-password
```

| Parâmetro | Tipo     | Descrição                                                        |
| :-------- | :------- | :--------------------------------------------------------------- |
| `email`   | `string` | **O usuário receberá um link${token} para redefinir sua senha**. |

#### Altera a senha do usuário

```http
  POST /user/reset-password
```

| Parâmetro                                 | Tipo     | Descrição                                                                                                               |
| :---------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| `newPassword, confirmPassword, req.query` | `string` | **O usuário deverá fornecer duas senhas iguais e o token deverá ser obtido através da URL do sistema: token=${token}**. |

</details>

<details>
<summary>Documentação das rotas de cliente</summary>

#### Cadastrar um cliente

```http
  POST /register/client
```

| Parâmetro                                       | Tipo     | Descrição                                                                                 |
| :---------------------------------------------- | :------- | :---------------------------------------------------------------------------------------- |
| `fullname, document_id, phone, email, password` | `string` | **Obrigatório estar autenticado na aplicação**. Somente usuários podem cadastrar clientes |

#### Retorna todos os clientes do sistema

```http
  GET /list/client
```

| Parâmetro | Tipo     | Descrição                                                                                     |
| :-------- | :------- | :-------------------------------------------------------------------------------------------- |
| `null`    | `string` | **Obrigatório estar autenticado na aplicação**. Somente usuário pode listar todos os clientes |

#### Atualiza dados de um cliente

```http
  PUT /update/client/:clientId
```

| Parâmetro                                | Tipo     | Descrição                                                                                                                           |
| :--------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `phone, :clientId, header.authorization` | `string` | **Obrigatório estar autenticado na aplicação**. Somente usuário pode alterar dados do cliente, deverá ser fornecido o ID do cliente |

#### Inativa um cliente

```http
  DELETE /inative/client/:clientId
```

| Parâmetro   | Tipo     | Descrição                                                                                        |
| :---------- | :------- | :----------------------------------------------------------------------------------------------- |
| `:clientId` | `string` | **Obrigatório estar autenticado na aplicação - Usuário**. Passar id do cliente que quer inativar |

#### Solicita um link de redefinição de senha

```http
  PATCH /client/forgot-password
```

| Parâmetro | Tipo     | Descrição                                                        |
| :-------- | :------- | :--------------------------------------------------------------- |
| `email`   | `string` | **O usuário receberá um link${token} para redefinir sua senha**. |

#### Altera a senha do cliente

```http
  POST /client/reset-password
```

| Parâmetro                                 | Tipo     | Descrição                                                                                                               |
| :---------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| `newPassword, confirmPassword, req.query` | `string` | **O usuário deverá fornecer duas senhas iguais e o token deverá ser obtido através da URL do sistema: token=${token}**. |

</details>

<details>
<summary>Documentação das rotas de autenticação</summary>

#### Fazer login do usuário

```http
  POST /auth/user
```

| Parâmetro         | Tipo     | Descrição                                                                                                                                                                              |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email, password` | `string` | **Usuário loga na aplicação fornecendo um email e senha, é gerado um token válido por 12horas, pós isso, o token será revogado e será necessário que o usuário faça login novamente**. |

#### Fazer login do cliente

```http
  POST /auth/client
```

| Parâmetro         | Tipo     | Descrição                                                                                                                                                                              |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email, password` | `string` | **Cliente loga na aplicação fornecendo um email e senha, é gerado um token válido por 12horas, pós isso, o token será revogado e será necessário que o usuário faça login novamente**. |

#### Fazer logout do usuário

```http
  GET /logout/user
```

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `null`    | `string` | **cookie que havia sido criado é removido**. |

#### Fazer logout do cliente

```http
  GET /logout/client
```

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `null`    | `string` | **cookie que havia sido criado é removido**. |

#### Verifica se o usuário ou cliente está logado na aplicação

```http
  GET /is-authenticated
```

| Parâmetro | Tipo     | Descrição                                                             |
| :-------- | :------- | :-------------------------------------------------------------------- |
| `null`    | `string` | **Valida se existe token, caso exista, valida se é um token valido**. |

</details>

### Route tests performed

<details>
<summary>user_routes</summary>

[x] - Create a new user.

[x] - List users.

[ ] - Update logged in user data.

[x] - Requests a password reset link.

[x] - Reset password.

[x] - Inactivate a user

</details>

<details>
<summary>client_routes</summary>

[x] - Create a new user.

[ ] - List clients.

[ ] - Update client.

[ ] - Requests a password reset link.

[ ] - Reset password.

[ ] - Inactivate a client

</details>

<details>
<summary>auth_routes</summary>

[x] - User login

[x] - Client login

[x] - Logout User/client

[x] - is-authenticated

</details>
