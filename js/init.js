import { getVeiculos, salvarVeiculo, excluirVeiculo, getVeiculoById } from "./apiService.js";

export function init(route) {
  if (route === '/list') {
    const tbody = document.querySelector("#lista tbody");
    getVeiculos().then(veiculos => {
      tbody.innerHTML = veiculos.map(v => `
        <tr>
          <td>${v.id}</td>
          <td>${v.modelo}</td>
          <td>${v.chassi}</td>
          <td>${v.fabricacao}</td>
          <td>${v.placa}</td>
          <td>${v.vendido ? 'Sim' : 'Não'}</td>
          <td>${v.quilometragem}</td>
          <td><button onclick="location.hash = '#/form?id=${v.id}'">Editar</button>
              <button onclick="excluir(${v.id})">Excluir</button></td>
        </tr>`).join("");
    });
  }

  if (route.startsWith('/form')) {
    const form = document.querySelector("#vehicle-form");
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const id = params.get('id');

    if (id) {
      getVeiculoById(id).then(v => {
        document.getElementById("id").value = v.id;
        document.getElementById("modelo").value = v.modelo;
        document.getElementById("chassi").value = v.chassi;
        document.getElementById("fabricacao").value = v.fabricacao;
        document.getElementById("placa").value = v.placa;
        document.querySelector(`#vendido-${v.vendido ? 'sim' : 'nao'}`).checked = true;
        document.getElementById("quilometragem").value = v.quilometragem;
      });
    }

    form.onsubmit = async (e) => {
      e.preventDefault();
      const veiculo = {
        id: form.id.value || null,
        modelo: form.modelo.value,
        chassi: form.chassi.value,
        fabricacao: form.fabricacao.value,
        placa: form.placa.value,
        vendido: document.getElementById("vendido-sim").checked,
        quilometragem: form.quilometragem.value
      };
      const ok = await salvarVeiculo(veiculo);
      document.getElementById("mensagem").textContent = ok ? "Salvo com sucesso!" : "Erro ao salvar.";
    };
  }
}

window.excluir = async function(id) {
  if (confirm("Deseja excluir o veículo?")) {
    const ok = await excluirVeiculo(id);
    if (ok) location.reload();
  }
}