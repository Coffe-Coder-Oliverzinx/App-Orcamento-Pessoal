"use strict";

//^ Criação da classe de ID dinamico
class Bd {
  constructor() {
    let id = localStorage.getItem('id');

    if (id === null) {
      localStorage.setItem('id', 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id');
    return parseInt(proximoId) + 1;
  }

  salvarDespesa(obj) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(obj));
    localStorage.setItem('id', id);
  }

  pegarDespesas() {
    let id = localStorage.getItem('id');
    let despesaArray = [];

    for (let i = 1; i <= id; i++) {
      let item = localStorage.getItem(i);

      if (item !== null) {
        let despesa = JSON.parse(item);
        despesa.id = i;
        despesaArray.push(despesa);
      }
    }

    return despesaArray
  }

  pesquisar(despesa) {
    let d = despesa;

    let despesaArray = []
    despesaArray = this.pegarDespesas();

    //? Ano
    if (d.year != '') {
      despesaArray = despesaArray.filter(currentIten => { return currentIten.year == d.year });
    }

    //? Mês
    if (d.mounth != '') {
      despesaArray = despesaArray.filter(currentIten => { return currentIten.mounth == d.mounth });
    }

    //? Dia
    if (d.day != '') {
      despesaArray = despesaArray.filter(currentIten => { return currentIten.day == d.day });
    }

    //? Tipo
    if (d.type != '') {
      despesaArray = despesaArray.filter(currentIten => { return currentIten.type == d.type });
    }

    //? Descrição
    if (d.description != '') {
      despesaArray = despesaArray.filter(currentIten => { return currentIten.description.trim().toLowerCase() == d.description.trim().toLowerCase() });
    }

    //? Valor
    if (d.price != '') {
      despesaArray = despesaArray.filter(currentIten => { return currentIten.price.trim() == d.price.trim() });
    }

    console.log(despesaArray);

    criaLista('filtra', despesaArray)
  }
}

//^Declaração de um monte de coisas
let bd = new Bd();
let button = document.getElementById('button')
let contador = localStorage.getItem('id');

//^ Função de carregar as despesas
function carregarDespesas() {
  let listaDespesas = bd.pegarDespesas();

  criaLista('cria', listaDespesas);
}

//^ Criar lista
function criaLista(modo, listaDespesas) {
  let tbody = document.getElementById('lista_Despesas');
  let desArray = null;

  switch (modo) {
    case 'cria':
      desArray = listaDespesas;

      desArray.forEach((despesa) => {
        if (!despesa) return;

        let tr = document.createElement('tr');
        tr.id = despesa.id;
        tbody.appendChild(tr);

        let td_data = document.createElement('td');
        let td_tipo = document.createElement('td');
        let td_descricao = document.createElement('td');
        let td_valor = document.createElement('td');
        let td_exclusao = document.createElement('td');

        td_data.textContent = `${despesa.day}/${despesa.mounth}/${despesa.year}`;
        td_tipo.textContent = despesa.type;
        td_descricao.textContent = despesa.description;
        td_valor.textContent = `${despesa.price} R$`;

        //todo botão de exclusao de tarefa
        let excluirBtn = document.createElement('button');
        excluirBtn.innerHTML = '<i class="fas fa-times"></i>';
        excluirBtn.className = 'btn btn-danger';
        excluirBtn.onclick = () => {
          tr.remove();
          localStorage.removeItem(despesa.id);
        }

        td_exclusao.appendChild(excluirBtn);

        tr.appendChild(td_data);
        tr.appendChild(td_tipo);
        tr.appendChild(td_descricao);
        tr.appendChild(td_valor);
        tr.appendChild(td_exclusao);
      });

      break;

    case 'filtra':
      tbody.innerHTML = ''

      desArray = listaDespesas;

      desArray.forEach((despesa) => {
        if (!despesa) return;

        let tr = document.createElement('tr');
        tr.id = despesa.id;
        tbody.appendChild(tr);

        let td_data = document.createElement('td');
        let td_tipo = document.createElement('td');
        let td_descricao = document.createElement('td');
        let td_valor = document.createElement('td');
        let td_exclusao = document.createElement('td');

        td_data.textContent = `${despesa.day}/${despesa.mounth}/${despesa.year}`;
        td_tipo.textContent = despesa.type;
        td_descricao.textContent = despesa.description;
        td_valor.textContent = `${despesa.price} R$`;

        //todo botão de exclusao de tarefa
        let excluirBtn = document.createElement('button');
        excluirBtn.innerHTML = '<i class="fas fa-times"></i>';
        excluirBtn.className = 'btn btn-danger';
        excluirBtn.onclick = () => {
          tr.remove();
          localStorage.removeItem(despesa.id);
        }

        td_exclusao.appendChild(excluirBtn);

        tr.appendChild(td_data);
        tr.appendChild(td_tipo);
        tr.appendChild(td_descricao);
        tr.appendChild(td_valor);
        tr.appendChild(td_exclusao);

      });

      break
  }

}

//^ Pesquisa uma despesa
function filtrarDespesa() {
  let ano = document.getElementById('ano').value;
  let mes = document.getElementById('mes').value;
  let dia = document.getElementById('dia').value;
  let tipo = document.getElementById('tipo').value;
  let descricao = document.getElementById('descricao').value;
  let valor = document.getElementById('valor').value;

  let despesaFiltrada = {
    year: ano,
    mounth: mes,
    day: dia,
    type: tipo,
    description: descricao,
    price: valor
  }

  bd.pesquisar(despesaFiltrada);
}

//^ Adiciona o evento de load no body
document.getElementById('documentBody').onload = () => {
  carregarDespesas();
}

//^ Adiciona o evento de click no botão de pesquisa
button.addEventListener('click', () => {
  filtrarDespesa()
})

//localStorage.clear()
