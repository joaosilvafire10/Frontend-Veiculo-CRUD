export const veiculos = JSON.parse(localStorage.getItem('veiculos') || '[]');

export function salvarVeiculos() {
  localStorage.setItem('veiculos', JSON.stringify(veiculos));
}

export function gerarIdUnico() {
  if (veiculos.length === 0) return '1';
  const ids = veiculos.map(v => parseInt(v.id)).filter(n => !isNaN(n));
  return (Math.max(...ids) + 1).toString();
}
