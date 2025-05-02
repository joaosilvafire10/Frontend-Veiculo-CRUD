type Veiculo = {
  id: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  cor: string;
  combustivel: string;
};

let veiculos: Veiculo[] = [];
let modoEdicaoId: string | null = null;

function gerarIdUnico(): string {
  if (veiculos.length === 0) {
    return '1';
  }

  // Pegamos o maior número de ID já usado
  const idsNumericos = veiculos.map(v => parseInt(v.id)).filter(id => !isNaN(id));
  const maiorId = Math.max(...idsNumericos);
  return (maiorId + 1).toString();
}

const form = document.getElementById('vehicle-form') as HTMLFormElement;
const mensagem = document.getElementById('mensagem') as HTMLDivElement;
const lista = document.getElementById('lista-veiculos') as HTMLUListElement;

const inputId = document.getElementById('id') as HTMLInputElement;
const inputMarca = document.getElementById('marca') as HTMLInputElement;
const inputModelo = document.getElementById('modelo') as HTMLInputElement;
const inputAno = document.getElementById('ano') as HTMLInputElement;
const inputPlaca = document.getElementById('placa') as HTMLInputElement;
const inputCor = document.getElementById('cor') as HTMLInputElement;
const inputCombustivel = document.getElementById('combustivel') as HTMLSelectElement;

window.addEventListener('DOMContentLoaded', () => {
  gerarNovoId();
  renderizarLista();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const veiculo: Veiculo = {
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
    const index = veiculos.findIndex(v => v.id === modoEdicaoId);
    if (index !== -1) veiculos[index] = veiculo;
    modoEdicaoId = null;
    mensagem.textContent = 'Veículo atualizado com sucesso!';
  } else {
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
  console.log("Renderizando lista")
  lista.innerHTML = '';
  veiculos.forEach((v) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${v.marca} ${v.modelo}</strong> (${v.ano}) - ${v.placa} - ${v.combustivel}
      <button onclick="editarVeiculo('${v.id}')">Editar</button>
      <button onclick="excluirVeiculo('${v.id}')">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

// Funções globais para serem usadas no onclick do HTML
(window as any).editarVeiculo = (id: string) => {
  const v = veiculos.find(v => v.id === id);
  if (!v) return;

  modoEdicaoId = v.id;

  inputId.value = v.id;
  inputMarca.value = v.marca;
  inputModelo.value = v.modelo;
  inputAno.value = v.ano;
  inputPlaca.value = v.placa;
  inputCor.value = v.cor;
  inputCombustivel.value = v.combustivel;

  mensagem.textContent = `Editando veículo ${v.marca} ${v.modelo}`;
};

(window as any).excluirVeiculo = (id: string) => {
  veiculos = veiculos.filter(v => v.id !== id);
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
