export function currency(n: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function discount(value: number, rate: number, period: number) {
  return value / Math.pow(1 + rate, period);
}
