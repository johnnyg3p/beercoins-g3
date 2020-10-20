import React from "react";
import UserInfo from "../../components/UserInfo";
import Statement from "../../components/Statement/statement";
import { IBankPosting, BankPostType } from "../../interfaces/IBankPosting";

const bankPostingsMock: IBankPosting[] = [
  {
    id: "564656",
    description: "salario",
    value: 100000,
    type: BankPostType.CREDIT,
    date: 1,
  },
  {
    id: "113654",
    description: "mercado livre",
    value: 5000,
    type: BankPostType.DEBIT,
    date: 6,
  },
  {
    id: "413654",
    description: "posto gasolina",
    value: 2399,
    type: BankPostType.DEBIT,
    date: 3,
  },
  {
    id: "213654",
    description: "posto gasolina",
    value: 4235,
    type: BankPostType.DEBIT,
    date: 2,
  },
];

const Home = () => {
  return (
    <>
      <UserInfo />
      <Statement bankPostings={bankPostingsMock} />
    </>
  );
};

export default Home;
