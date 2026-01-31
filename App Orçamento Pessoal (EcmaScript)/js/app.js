"use strict";

//^ Criação da classe de despesas
class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.year = ano;
    this.mounth = mes;
    this.day = dia;
    this.type = tipo;
    this.description = descricao;
    this.price = valor;
  }
}

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

  carregarDespesas() {
    console.log('funcionando');

  }
}

//^Declaração do botão e do objeto 'BD'
let bd = new Bd()
let button = document.getElementById('button_add');

function cadastrarDespesa() {
  //^ Declaração de variaveis locais
  let ano = document.getElementById('ano');
  let mes = document.getElementById('mes');
  let dia = document.getElementById('dia');
  let tipo = document.getElementById('tipo');
  let descricao = document.getElementById('descricao');
  let valor = document.getElementById('valor');

  //^ Verifica se há algum campo vazio
  if ((ano.value !== '') && (mes.value !== '') && (dia.value !== '') && (tipo.value !== '') && (descricao.value !== '') && (valor.value !== '')) {

    //^ Verifica qual mes que foi colocado no campo
    switch (mes.value) {
      case '1':
      case '3':
      case '5':
      case '7':
      case '8':
      case '10':
      case '12':

        //^ Verifica se o dia existe no mes
        if (!((dia.value >= 32) || (dia.value <= -1))) {
          saveModal('done');
          $('#save').modal('show');

          let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
          bd.salvarDespesa(despesa);

          ano.value = '';
          mes.value = '';
          dia.value = '';
          tipo.value = '';
          descricao.value = '';
          valor.value = '';

        } else {
          saveModal('error');
          $('#save').modal('show');
        }
        break;

      case '2':

        //^ Verifica se o dia existe no mes
        if (!((dia.value >= 30) || (dia.value <= -1))) {
          saveModal('done');
          $('#save').modal('show');

          let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
          bd.salvarDespesa(despesa);

          ano.value = '';
          mes.value = '';
          dia.value = '';
          tipo.value = '';
          descricao.value = '';
          valor.value = '';

        } else {
          saveModal('error');
          $('#save').modal('show');
        }

        break;

      case '4':
      case '6':
      case '9':
      case '11':

        //^ Verifica se o dia existe no mes
        if (!((dia.value >= 31) || (dia.value <= -1))) {
          saveModal('done');
          $('#save').modal('show');

          let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
          bd.salvarDespesa(despesa);

          ano.value = '';
          mes.value = '';
          dia.value = '';
          tipo.value = '';
          descricao.value = '';
          valor.value = '';

        } else {
          saveModal('error');
          $('#save').modal('show');
        }
        break;
    }
  } else {
    saveModal('error');
    $('#save').modal('show');
  }

}

//^ Muda o estilo do modal
function saveModal(type) {
  let tittle = document.getElementById('modal_tittle');
  let body = document.getElementById('modal_body');
  let button = document.getElementById('modal_button');
  let header = document.getElementById("modal_header");

  switch (type) {
    case 'done':
      tittle.textContent = 'Tudo certo!';
      body.textContent = 'Sua despesa foi salva!';
      button.className = 'btn btn-primary';
      header.className = 'modal-header text-primary';
      break;

    case 'error':
      tittle.textContent = 'Erro ao salvar';
      body.textContent = 'Tenha certeza de que todos os campos estão preenchidos!';
      button.className = 'btn btn-danger';
      header.className = 'modal-header text-danger';
      break;
  }
}

//^ Adiciona o evento de click no botão
button.addEventListener('click', () => {
  cadastrarDespesa();
})

//localStorage.clear()
