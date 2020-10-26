import { formatCurrency } from "../formaters/formaters";

interface IBarcode {
  code: string;
  bank: string;
  amount: string;
}

interface IBank {
  [key: string]: string;
}

const banks = (bank: string): string => {
  const list: IBank = {
    "001": "Banco do Brasil",
    "104": "Caixa Econômica Federal",
    "75": "Banco ABN Amro S.A.",
    "477": "Banco Citibank",
    "341": "Banco Itaú Unibanco",
    "422": "Banco Safra",
    "033": "Banco Santander",
    "237": "Banco Bradesco",
    "212": "Banco Original",
    "748": "Banco Cooperativo Sicredi",
  };
  return `${bank} - ${list[bank] || "Banco não encontrado"}`;
};

export const decoder = (barcoder: string): IBarcode => {
  const code: string = barcoder;
  let bank: string = barcoder.substring(0, 3);
  let amountEnd: string = barcoder.substring(barcoder.length - 6);
  bank = banks(bank);
  amountEnd = amountEnd.replace(/(\d{4})(\d)/, "$1.$2");
  const amount: string = formatCurrency(Number(amountEnd));
  return { code, bank, amount };
};
