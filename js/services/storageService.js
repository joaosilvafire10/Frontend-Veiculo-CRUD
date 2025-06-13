export const veiculos = [];

export function gerarIdUnico() {
  if (veiculos.length === 0) return '1';
  const ids = veiculos.map(v => parseInt(v.id)).filter(n => !isNaN(n));
  return (Math.max(...ids) + 1).toString();
}
