class Conta {
  constructor(descricao, valor, dataVencimento, responsavel, tipo, observacao, concluida = false) {
    this.id = Date.now();
    this.descricao = descricao;
    this.valor = parseFloat(valor).toFixed(2);
    this.dataVencimento = dataVencimento;
    this.responsavel = responsavel;
    this.tipo = tipo;
    this.observacao = observacao;
    this.concluida = concluida;
  }
}

const listaPendentes = document.getElementById('listaPendentes');
const listaConcluidas = document.getElementById('listaConcluidas');
const form = document.getElementById('taskForm');

let contas = JSON.parse(localStorage.getItem('contasApp')) || [];

function salvarDados() {
  localStorage.setItem('contasApp', JSON.stringify(contas));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const descricao = form.descricao.value.trim();
  const valor = form.valor.value;
  const dataVencimento = form.dataVencimento.value;
  const responsavel = form.responsavel.value.trim();
  const tipo = form.tipo.value;
  const observacao = form.observacao.value.trim();

  if (!descricao || !valor || !dataVencimento || !responsavel || !tipo) return;

  const novaConta = new Conta(descricao, valor, dataVencimento, responsavel, tipo, observacao);
  contas.push(novaConta);
  form.reset();
  render();
  salvarDados();
});

function render() {
  listaPendentes.innerHTML = '';
  listaConcluidas.innerHTML = '';

  contas.forEach(conta => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';

    const dataFormatada = new Date(conta.dataVencimento + 'T00:00:00').toLocaleDateString('pt-BR');

    li.innerHTML = `
      <div>
        <strong>${conta.tipo}:</strong> ${conta.descricao}<br>
        <small>💲 ${conta.valor} | 🗓️ ${dataFormatada} | 👤 ${conta.responsavel}</small><br>
        <small><em>${conta.observacao || ''}</em></small>
      </div>
      <div>
        ${conta.concluida
          ? `<button class="btn btn-sm btn-danger" onclick="excluirConta(${conta.id})">Excluir</button>`
          : `<button class="btn btn-sm btn-success" onclick="marcarConcluida(${conta.id})">Concluir</button>`}
      </div>
    `;

    if (conta.concluida) {
      li.classList.add('done');
      listaConcluidas.appendChild(li);
    } else {
      listaPendentes.appendChild(li);
    }
  });
}

function marcarConcluida(id) {
  contas = contas.map(c => c.id === id ? { ...c, concluida: true } : c);
  render();
  salvarDados(); 
}

function excluirConta(id) {
  contas = contas.filter(c => c.id !== id);
  render();
  salvarDados(); 
}

document.getElementById('saveData').addEventListener('click', () => {
  salvarDados();
  alert('Dados salvos manualmente!');
});

document.getElementById('loadData').addEventListener('click', () => {
  contas = JSON.parse(localStorage.getItem('contasApp')) || [];
  render();
  alert('Dados recarregados do storage!');
});


document.getElementById('clearData').addEventListener('click', () => {
  if (confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem('contasApp');
    contas = [];
    render();
  }
});

render();
