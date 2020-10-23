export const formatCurrency = (currency: number): string => {
  return currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatBankPost = (bankPost: DebitCredit): string => {
  return bankPost === "D" ? "Débito" : "Crédito";
};
