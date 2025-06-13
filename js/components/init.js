import { veiculos, gerarIdUnico } from '../services/storageService.js';

export function init(route) {
  if (route === '/form') {
    const form = document.getElementById('vehicle-form');
    const idInput = document.getElementById('id');
    idInput.value = gerarIdUnico();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const veiculo = {
        id: idInput.value,
        modelo: form.modelo.value,
        chassi: form.chassi.value,
        fabricacao: form.fabricacao.value,
        placa: form.placa.value,
        vendido: form.vendido.value,
        quilometragem: form.quilometragem.value
      };
      veiculos.push(veiculo);
      document.getElementById('mensagem').textContent = 'Veículo cadastrado com sucesso!';
      form.reset();
      idInput.value = gerarIdUnico();
    });
  } else if (route === '/list') {
    const tbody = document.querySelector('#lista tbody');
    tbody.innerHTML = '';
    veiculos.forEach(v => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${v.id}</td><td>${v.modelo}</td><td>${v.chassi}</td>
        <td>${v.fabricacao}</td><td>${v.placa}</td><td>${v.vendido}</td>
        <td>${v.quilometragem}</td>
        <td><button onclick="excluir('${v.id}')">Excluir</button></td>`;
      tbody.appendChild(tr);
    });
    window.excluir = function(id) {
      const index = veiculos.findIndex(v => v.id === id);
      if (index !== -1) {
        veiculos.splice(index, 1);
        init('/list');
      }
    };
  }
}
