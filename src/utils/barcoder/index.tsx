import { formatCurrency } from "../formaters/formaters";

interface IBarcode {
  code: string;
  bank: string;
  amount: string;
}

const banks = (bank: string): string => {
  const list = [
    { code: "001", value: "Banco do Brasil" },
    { code: "104", value: "Caixa Econômica Federal" },
    { code: "75", value: "Banco ABN Amro S.A." },
    { code: "477", value: "Banco Citibank" },
    { code: "341", value: "Banco Itaú Unibanco" },
    { code: "422", value: "Banco Safra" },
    { code: "033", value: "Banco Santander" },
    { code: "237", value: "Banco Bradesco" },
    { code: "212", value: "Banco Original" },
    { code: "748", value: "Banco Cooperativo Sicredi" },
  ];
  let selectedBank = list.find((item) => item.code === bank)?.value;
  return `${bank} - ${selectedBank || "Banco não encontrado"}`;
};

export const decoder = (barcoder: string): IBarcode => {
  const code: string = barcoder;
  let bank: string = barcoder.substring(0, 3);
  bank = banks(bank);
  let amountEnd: string = barcoder.substring(barcoder.length - 6);
  amountEnd = amountEnd.replace(/(\d{4})(\d)/, "$1.$2");
  const amount: string = formatCurrency(Number(amountEnd));
  return { code, bank, amount };
};
