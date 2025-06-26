const BASE_URL = "http://localhost:8080/api/veiculos";

export async function getVeiculos() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getVeiculoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function salvarVeiculo(veiculo) {
  const method = veiculo.id ? "PUT" : "POST";
  const url = veiculo.id ? `${BASE_URL}/${veiculo.id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(veiculo)
  });
  return res.ok;
}

export async function excluirVeiculo(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.ok;
}