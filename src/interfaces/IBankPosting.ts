export interface IBankPosting {
  id: string;
  description: string;
  value: number;
  type: BankPostType;
  date: number;
}

export enum BankPostType {
  CREDIT = "credito",
  DEBIT = "débito",
}
