export function formatCurrency(amount: number, currencyCode: string = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    // Fallback to a simple format if the Intl API fails
    console.error("Error formatting currency", error);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}
