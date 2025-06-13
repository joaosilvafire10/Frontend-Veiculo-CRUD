import { veiculos, gerarIdUnico, salvarVeiculos } from '../services/storageService.js';

export function init(route) {
  if (route === '/form') {
    const form = document.getElementById('vehicle-form');
    const idInput = document.getElementById('id');

    // Verifica se é edição
    const editId = localStorage.getItem('editId');
    if (editId) {
      const veiculo = veiculos.find(v => v.id === editId);
      if (veiculo) {
        idInput.value = veiculo.id;
        document.getElementById('modelo').value = veiculo.modelo;
        document.getElementById('chassi').value = veiculo.chassi;
        document.getElementById('fabricacao').value = veiculo.fabricacao;
        document.getElementById('placa').value = veiculo.placa;
        document.getElementById('quilometragem').value = veiculo.quilometragem;
        if (veiculo.vendido === 'sim') {
          document.getElementById('vendido-sim').checked = true;
        } else {
          document.getElementById('vendido-nao').checked = true;
        }
      }
    } else {
      idInput.value = gerarIdUnico();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const veiculo = {
        id: idInput.value,
        modelo: document.getElementById('modelo').value,
        chassi: document.getElementById('chassi').value,
        fabricacao: document.getElementById('fabricacao').value,
        placa: document.getElementById('placa').value,
        vendido: document.querySelector('input[name="vendido"]:checked').value,
        quilometragem: document.getElementById('quilometragem').value
      };

      const index = veiculos.findIndex(v => v.id === veiculo.id);
      if (index !== -1) {
        veiculos[index] = veiculo;
        document.getElementById('mensagem').textContent = 'Veículo atualizado com sucesso!';
      } else {
        veiculos.push(veiculo);
        document.getElementById('mensagem').textContent = 'Veículo cadastrado com sucesso!';
      }

      salvarVeiculos();
      form.reset();
      localStorage.removeItem('editId');
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
        <td>
          <button onclick="excluir('${v.id}')">Excluir</button>
          <button onclick="editar('${v.id}')">Editar</button>
        </td>`;
      tbody.appendChild(tr);
    });

    window.excluir = function(id) {
      const index = veiculos.findIndex(v => v.id === id);
      if (index !== -1) {
        veiculos.splice(index, 1);
        salvarVeiculos();
        init('/list');
      }
    };

    window.editar = function(id) {
      localStorage.setItem('editId', id);
      location.hash = '#/form';
    };
  }
}
