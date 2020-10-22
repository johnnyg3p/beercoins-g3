interface IStatement {
  horarioOperacao: string;
  tipoOperacao: number;
  valorOperacao: number;
  hash: string;
  debitCredit: "C" | "D";
}
