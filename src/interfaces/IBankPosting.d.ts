interface IStatement {
  horarioOperacao: string;
  tipoOperacao: number;
  valorOperacao: number;
  hash: string;
  debitCredit: DebitCredit;
}

type DebitCredit = "C" | "D";

interface IBankPost {
  C: "Crédito";
  D: "Débito";
}
