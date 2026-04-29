const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatCOP(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "";
  return copFormatter.format(value);
}

export function parseCOP(input: string): number {
  const digits = input.replace(/\D/g, "");
  return digits.length > 0 ? Number(digits) : 0;
}
