var veiculos = [];
var modoEdicaoId = null;
function gerarIdUnico() {
    if (veiculos.length === 0) {
        return '1';
    }
    // Pegamos o maior número de ID já usado
    var idsNumericos = veiculos.map(function (v) { return parseInt(v.id); }).filter(function (id) { return !isNaN(id); });
    var maiorId = Math.max.apply(Math, idsNumericos);
    return (maiorId + 1).toString();
}
var form = document.getElementById('vehicle-form');
var mensagem = document.getElementById('mensagem');
var lista = document.getElementById('lista-veiculos');
var inputId = document.getElementById('id');
var inputModelo = document.getElementById('modelo');
var inputChassi = document.getElementById('chassi');
var inputFabricacao = document.getElementById('fabricacao');
var inputPlaca = document.getElementById('placa');
var inputVendido = document.querySelector('input[name="vendido"]:checked');
var inputQuilometragem = document.getElementById('quilometragem');
window.addEventListener('DOMContentLoaded', function () {
    gerarNovoId();
    renderizarLista();
});
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var veiculo = {
        id: inputId.value,
        modelo: inputModelo.value,
        chassi: inputChassi.value,
        fabricacao: inputFabricacao.value,
        placa: inputPlaca.value,
        vendido: inputVendido.value,
        quilometragem: inputQuilometragem.value
    };
    if (modoEdicaoId) {
        // Edição
        var index = veiculos.findIndex(function (v) { return v.id === modoEdicaoId; });
        if (index !== -1)
            veiculos[index] = veiculo;
        modoEdicaoId = null;
        mensagem.textContent = 'Veículo atualizado com sucesso!';
    }
    else {
        // Cadastro novo
        veiculos.push(veiculo);
        mensagem.textContent = 'Veículo cadastrado com sucesso!';
    }
    mensagem.className = 'sucesso';
    form.reset();
    gerarNovoId();
    renderizarLista();
});
function gerarNovoId() {
    inputId.value = gerarIdUnico();
}

function renderizarLista() {
    const tabela = document.getElementById('lista').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    veiculos.forEach(function (v) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${v.id}</td>
      <td>${v.modelo}</td>
      <td>${v.chassi}</td>
      <td>${v.fabricacao}</td>
      <td>${v.placa}</td>
      <td>${v.vendido ? 'Sim' : 'Não'}</td>
      <td>${v.quilometragem}</td>
      <td>
        <button onclick="editarVeiculo('${v.id}')">Editar</button>
        <button onclick="excluirVeiculo('${v.id}')">Excluir</button>
      </td>
    `;
        tabela.appendChild(tr);
    });
}
// Funções globais para serem usadas no onclick do HTML
window.editarVeiculo = function (id) {
    var v = veiculos.find(function (v) { return v.id === id; });
    if (!v)
        return;
    modoEdicaoId = v.id;
    inputId.value = v.id;
    inputModelo.value = v.modelo;
    inputChassi.value = v.chassi;
    inputFabricacao.value = v.fabricacao;
    inputPlaca.value = v.placa;
    inputVendido.value = v.vendido;
    inputQuilometragem.value = v.quilometragem;
    mensagem.textContent = "Editando ve\u00EDculo ".concat(v.modelo, " ").concat(v.placa);
};
window.excluirVeiculo = function (id) {
    veiculos = veiculos.filter(function (v) { return v.id !== id; });
    renderizarLista();
    mensagem.textContent = 'Veículo removido com sucesso!';
    mensagem.className = 'sucesso';
    // Se estava editando este veículo, limpa
    if (modoEdicaoId === id) {
        modoEdicaoId = null;
        form.reset();
        gerarNovoId();
    }
};
