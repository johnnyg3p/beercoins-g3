export const formatCurrency = (currency: number): string => {
  if (!currency) return "0";
  return currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatCurrencyWithoutCurrencySymbol = (currency: number): string => {
  const formatedCurrency = currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return formatedCurrency.replace("R$ ", "");
};

export const formatCurrencyIntoInteger = (currency: string): number => {
  return Number(currency.replace(/\D/g, "")) / 100;
};

export const formatBankPost = (bankPost: DebitCredit): string => {
  return bankPost === "D" ? "Débito" : "Crédito";
};

export const formatCNPJ = (inputValue: string): string => {
  if (inputValue) {
    return inputValue
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  return "";
};

export const formatOnlyNumbers = (inputValue: string): string => {
  return inputValue.replace(/\D/g, "");
};

export const formatBill = (inputValue: string): string => {
  if (inputValue) {
    // 34191.79001 01043.510047 91020.150008 6 84190026000
    return inputValue
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1.$2")
      .replace(/(\d{5}).(\d)/, "$1.$2")
      .replace(/(\d{5}).(\d{5})(\d)/, "$1.$2 $3")
      .replace(/(\d{5}).(\d{5}) (\d{5})(\d)/, "$1.$2 $3.$4")
      .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{6})(\d)/, "$1.$2 $3.$4 $5")
      .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{6}) (\d{5})(\d)/, "$1.$2 $3.$4 $5.$6")
      .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{6}) (\d{5}).(\d{6})(\d)/, "$1.$2 $3.$4 $5.$6 $7")
      .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{6}) (\d{5}).(\d{6}) (\d{1})(\d)/, "$1.$2 $3.$4 $5.$6 $7 $8")
      .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{6}) (\d{5}).(\d{6}) (\d{1}) (\d{11})\d+?$/, "$1.$2 $3.$4 $5.$6 $7 $8");
  }
  return "";
};

export const isValidBill = (inputValue: string): boolean => {
  //34191790010104351004791020150008684190026000
  if (inputValue) {
    return formatOnlyNumbers(inputValue).length === 44;
  }

  return false;
};
