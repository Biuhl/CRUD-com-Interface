// Script que conversa com API

const lista = document.getElementById('lista');
const form = document.getElementById('form');
const input = document.getElementById('nome');

function carregar(){
    fetch('/tarefas')
     .then(res => res.json())
     .then(tarefas => {
        lista.innerHTML = '';
        tarefas.forEach(t => {
            const li = document.createElement('li');
            li.className = t.status === 'concluida' ? 'concluida' : '';

            li.innerHTML = `
                ${t.nome}
          <div>
            <button onclick="toggle(${t.id})">✔</button>
            <button onclick="remover(${t.id})">🗑</button>
          </div>
        `;

        lista.appendChild(li);

        });
     });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/tarefas', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({nome: input.value})
    }).then(() =>{
        input.value = '';
        carregar();
    });
});

function toggle(id) {
    fetch(`/tarefas/${id}`, {method: 'PUT'})
    .then(carregar)
    .catch(erro => console.error('Erro ao alterar status:', erro));
}

function remover(id) {
  fetch(`/tarefas/${id}`, { method: 'DELETE' })
    .then(carregar);
}

document.addEventListener('DOMContentLoaded', carregar);