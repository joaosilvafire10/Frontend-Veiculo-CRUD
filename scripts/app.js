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
var inputMarca = document.getElementById('marca');
var inputModelo = document.getElementById('modelo');
var inputAno = document.getElementById('ano');
var inputPlaca = document.getElementById('placa');
var inputCor = document.getElementById('cor');
var inputCombustivel = document.getElementById('combustivel');
window.addEventListener('DOMContentLoaded', function () {
    gerarNovoId();
    renderizarLista();
});
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var veiculo = {
        id: inputId.value,
        marca: inputMarca.value,
        modelo: inputModelo.value,
        ano: inputAno.value,
        placa: inputPlaca.value,
        cor: inputCor.value,
        combustivel: inputCombustivel.value
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
    console.log("Renderizando lista");
    lista.innerHTML = '';
    veiculos.forEach(function (v) {
        var li = document.createElement('li');
        li.innerHTML = "\n      <strong>".concat(v.marca, " ").concat(v.modelo, "</strong> (").concat(v.ano, ") - ").concat(v.placa, " - ").concat(v.combustivel, "\n      <button onclick=\"editarVeiculo('").concat(v.id, "')\">Editar</button>\n      <button onclick=\"excluirVeiculo('").concat(v.id, "')\">Excluir</button>\n    ");
        lista.appendChild(li);
    });
}
// Funções globais para serem usadas no onclick do HTML
window.editarVeiculo = function (id) {
    var v = veiculos.find(function (v) { return v.id === id; });
    if (!v)
        return;
    modoEdicaoId = v.id;
    inputId.value = v.id;
    inputMarca.value = v.marca;
    inputModelo.value = v.modelo;
    inputAno.value = v.ano;
    inputPlaca.value = v.placa;
    inputCor.value = v.cor;
    inputCombustivel.value = v.combustivel;
    mensagem.textContent = "Editando ve\u00EDculo ".concat(v.marca, " ").concat(v.modelo);
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
