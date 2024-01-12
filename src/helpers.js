export function formatNumber(num) {
    return num % 1 === 0 ? num : num.toFixed(4);
  }