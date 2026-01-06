CRUD de Tarefas com Interface Web e API Express

Este projeto é um CRUD de tarefas completo, desenvolvido com Node.js e Express, que simula um banco de dados utilizando um arquivo JSON e possui interface web em HTML, CSS e JavaScript, consumindo a API via fetch.

O objetivo é consolidar conceitos fundamentais de backend, frontend, API REST e integração entre camadas, com foco em aprendizado prático.

🚀 Funcionalidades

📋 Listar tarefas

➕ Adicionar novas tarefas

✅ Marcar tarefas como concluídas ou pendentes

🗑️ Remover tarefas

💾 Persistência de dados em arquivo tarefas.json

🌐 Interface web consumindo a API

🛠️ Tecnologias Utilizadas

Node.js

Express

HTML5

CSS3

JavaScript (Vanilla)

Fetch API

Git & GitHub

📁 Estrutura do Projeto
CrudComInterface/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── tarefas.json
├── index.js
├── package.json
├── package-lock.json
└── .gitignore

⚙️ Como Executar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git

2️⃣ Entre na pasta do projeto
cd CrudComInterface

3️⃣ Instale as dependências
npm install

4️⃣ Inicie o servidor
node index.js

5️⃣ Acesse no navegador
http://localhost:3000

🔌 Endpoints da API
🔹 Listar tarefas
GET /tarefas

🔹 Criar tarefa
POST /tarefas

{
  "nome": "Estudar Express"
}

🔹 Atualizar status da tarefa
PUT /tarefas/:id

🔹 Remover tarefa
DELETE /tarefas/:id

🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

Aprender Express na prática

Entender o fluxo Frontend ↔ API ↔ Persistência

Simular um backend real sem banco de dados

Criar um projeto apresentável para GitHub e LinkedIn

Consolidar fundamentos exigidos para vagas Dev Jr

📌 Próximas Melhorias (ideias)

Validação mais robusta

Filtro por tarefas concluídas/pendentes

Edição de nome da tarefa

Banco de dados real (MongoDB ou MySQL)

Autenticação de usuário

👨‍💻 Autor

Projeto desenvolvido por Gabriel (Biuhl)
Estudante de Análise e Desenvolvimento de Sistemas
Focado em Backend, APIs e Automação
