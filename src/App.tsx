import React from 'react';
import SignIn from './screens/SignIn/SignIn'
import './App.css';
import Routes from './routes';
import Statement from './components/statement/statement';
import IBankPosting, {BankPostType} from './services/Interfaces/IBankPosting';


const bankPostingsMock: IBankPosting[]  = 
  [{
    id: "564656",
    description: "salario",
    value: 100000,
    type: BankPostType.CREDIT,
    date: 1
  },{
    id: "113654",
    description: "mercado livre",
    value: 5000,
    type: BankPostType.DEBIT,
    date: 6
  },{
    id: "413654",
    description: "posto gasolina",
    value: 2399,
    type: BankPostType.DEBIT,
    date: 3
  },{
    id: "213654",
    description: "posto gasolina",
    value: 4235,
    type: BankPostType.DEBIT,
    date: 2
  },];
  

  
function App() {
  return (
    <div className="App">
      <Routes />
      <SignIn />
      <Statement bankPostings={ bankPostingsMock } />
    </div>
  );
}

export default App;
