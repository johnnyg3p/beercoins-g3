import React from "react";
import Accounts from '../../components/Accounts/Accounts';

const accountsMock: IAccount[] = [
  {
    id: "564456",
    name: "Johnny",
    hash: "1234",
    cnpj: "21.386.317/0001-88"
  },
  {
    id: "264656",
    name: "João",
    hash: "1234",
    cnpj: "88.388.608/0001-86"
  },
  {
    id: "564666",
    name: "Maria",
    hash: "1234",
    cnpj: "26.909.879/0001-82"
  },
  {
    id: "164656",
    name: "Teste",
    hash: "1234",
    cnpj: "78.924.666/0001-23"
  },
];

const Operations = () => {
  return (
    <div>
      <Accounts accounts={accountsMock} />
    </div>
  );
};

export default Operations;