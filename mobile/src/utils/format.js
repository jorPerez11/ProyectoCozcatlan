export function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return `$${value.toFixed(2)}`;
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-SV", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
