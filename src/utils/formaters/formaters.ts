export const formatCurrency = (currency: number): string => {
  return currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatCurrencyWithouCurrencyDisplay = (currency: number): string => {
  const formatedCurrency = currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});

  return formatedCurrency.replace('R$ ', '');
};

export const formatCurrencyIntoInteger = (currency: string): number => {
  return Number(currency.replace(/\D/g, "")) / 100;
}

export const formatBankPost = (bankPost: DebitCredit): string => {
  return bankPost === "D" ? "Débito" : "Crédito";
};

