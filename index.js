// express framework web para node.js que 
//facilita a criacao de apis
const express = require('express');

//file system - modulo nativo para manipular arquivos...
const fs = require('fs');

// modulo nativo para trabalhar com
//caminhos de arquivos....
const path = require('path');

// app = express cria a instancia do express
// essa variavel sera usada para configurar as rotas 
// middleware e inicializar o servidor...
const app = express();
const PORT = 3000;

// middlewares 
// express.json -> converte automaticamente requisicoes com
// json no corpo para objetos javaScript
app.use(express.json());
// app.use(express.json()); -> serve para arquivos da pasta
// public ("html, css, img...")
app.use(express.static('public'));


// arquivo = simulador de banco de dados

const arquivo = path.join(__dirname, 'tarefas.json');



// funcoes auxiliares...
// lertarefas -> le e retorna todas as tarefas do arq json

function lerTarefas(){
    return JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
}
// salvar tarefas -> salva a lista de tarefas no arquivo json
function salvarTarefas(tarefas){
    fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2));
}

// rotas api

// app.get retorna todas as tarefas como JSON quando acessado via GET
app.get('/tarefas', (req, res) =>{
    res.json(lerTarefas());
});

// app.post('/tarefas', (req, res) => define uma rota que responde a requisições HTP POST
// (req, res=>{}) -> função callback executada quando a rota é acessada
// req = request -> contém dados de requisição
// res = response -> objeto para enviar respostas ao cliente
app.post('/tarefas', (req, res) =>{

    // Destructing assgnment: extrai a propriedade nome do objeto req.body
    // req.body: contem os dados do JSON enviados no corpo da requisição
    const{nome} = req.body;

    // if(!nome) -> verifica se há algo valido em nome
    if (!nome)return res.status(400).json({erro: "Tarefa nao encontrada"});

    // caso o if de cima seja falso, chama const tarefas: lerTarefas lê
    // o arquivo tarefas.json e retorna um array com todas as tarefas 
    // existentes...
    const tarefas = lerTarefas();

    // funcao que cria uma nova tarefa
    // se houver tarefas ( tarefas.length > 0) -
    // -> id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1, -
    // -> pega a ultima tarefa do array...
    // se nao houver tarefas (array vazio) id=1
    const nova = {
    id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome,
    status: 'pendente'
  };

  tarefas.push(nova);
  salvarTarefas(tarefas);
  res.status(201).json(nova);
});

// app.put -> define uma rota que responde a requisições HTTP PUT
// /tarefas/.id: tarefas é parte fixa do caminho, :id é o parametro -
// - de rota que captura um valor da URL
app.put('/tarefas/:id', (req,res) =>{
    const id = Number(req.params.id);

    // isto carrega todas as tarefas do arquivo JSON para a memoria
    const tarefas = lerTarefas();

    // tarefas.find(...) -> metodo array q busca o primeiro elemento que satisfaz 
    // a condição (...);
    // t => t.id === id: Funcao arrow callback que testa cada tarefa, verificando
    // se t.id é igual a id da URL...
    // tarefas.find retornando objeto 
    const tarefa = tarefas.find(t => t.id === id);

    // isto verifica se a tarefa existe
    // 
    if (!tarefa) return res.status(404).json({ erro: 'Não encontrada' });

    // Operador ternário ( condição ? valor se verdadeiro : valor se falso )
    //
    tarefa.status = tarefa.status === 'pendente' ? 'concluida' : 'pendente';
    
    // salva no JSON o array modificado
    salvarTarefas(tarefas);

    // Retorna a tarefa atualizada como resposta JSON 
    res.json(tarefa);
    
});


// define uma rota que responde a requisicoes HTTP DELETE 
app.delete('/tarefas/:id', (req, res) => {

    // id = Number() -> converte id da url em string
    const id = Number(req.params.id);

    //carrega todas as tarefas do JSON na memoria
    const tarefas = lerTarefas();

    // findIndex retorna o indice no array
    // t => t.id === id : retornando a posição, nao o objeto
    const index = tarefas.findIndex(t => t.id === id);

    // -1 é retornado caso findIndex nao ache nada....
    if (index === -1) return res.status(404).json({erro: 'Nao encontrada'});


    // tarefas.splice -> metodo que modifica o array original
    // (index, 1) -> remove 1 elemento na posiçao index...
    tarefas.splice(index, 1);
    salvarTarefas(tarefas);
    res.sendStatus(204);

});

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
