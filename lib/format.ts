export function guaranies(monto: number): string {
  if (monto >= 1_000_000_000)
    return `₲ ${(monto / 1_000_000_000).toFixed(1)} mil millones`;
  if (monto >= 1_000_000)
    return `₲ ${(monto / 1_000_000).toFixed(1)} millones`;
  return `₲ ${monto.toLocaleString("es-PY")}`;
}

export function millones(monto: number): string {
  return `₲ ${(monto / 1_000_000).toFixed(1)}M`;
}
