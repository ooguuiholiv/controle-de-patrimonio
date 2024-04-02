
## Controle de Acompanhamento de Patrimonio

Projeto criado para auxiliar no controle de ferramentas e carros alocados em cada obra/cidade a fim de auxiliar na gestão empresarial.


## Stack utilizada

**Front-end:** Next, TailwindCSS

**Back-end:** Node, Express, MongoDb


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

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

## 🚀 Sobre mim
Tenho 24 anos, sou cristão, guitarrista/adorador, e sou apaixonado pelo Desenvolvimento Front-End. Ultimamente tenho estudado muito sobre o Back-End, espero um dia ter conhecimento suficiente para me auto proclamar Desenvolvedor Full-Stack.


## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-next-js-jade.vercel.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/oguuiholiv/)

[![twitter](https://img.shields.io/badge/insta-1DA1F2?style=for-the-badge&logo=instagram&logoColor)](https://www.instagram.com/ooguuiholiv/)





## 🛠 Habilidades
<p align="left"> 
    <a href="https://www.w3.org/html/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/html-5.png"/> </a> 
    <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/css3.png"/> </a> 
    <a href="https://getbootstrap.com.br/docs/4.1/getting-started/download/" target="_blank" <img src="https://img.icons8.com/color/48/000000/bootstrap.png"/> </a>
    <a href="https://sass-lang.com" target="_blank"> <img src="https://img.icons8.com/color/48/000000/sass-avatar.png"/> </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"  width="48" height="48"/> </a> 
    <a href="https://pt-br.reactjs.org" targer="_blank"> <img src="https://img.icons8.com/ultraviolet/48/000000/react--v2.png"/> </a>
    <a style="padding-right:8px;" href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a>
    <a href="https://git-scm.com/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/git.png"/> </a> 
   <a align="center"href="https://www.adobe.com/br/products/photoshop/" target="_blank" > <img src="https://i.pinimg.com/originals/31/02/38/31023806400284920008d8ebd24a2218.png"  width="48" height="48"/> </a>
   <a href="https://code.visualstudio.com/docs" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png"  width="44" height="44"/></a> 
   
   
</p>


## Instalação

Instale controle-de-patrimonio com npm

```bash
  git clone https://github.com/ooguuiholiv/controle-de-patrimonio.git
  cd controle-de-patrimonio
  npm install 
  touch .env
  // Lembre de colocar os dados de suas variáveis de ambiente.
  npm run dev
```
    
## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.

