import React from 'react';
import SignIn from './screens/SignIn/SignIn'
import './App.css';
import Routes from './routes';
import Statement from './components/statement/statement';
import IBankPosting, { BankPostType } from './services/Interfaces/IBankPosting';
import { BrowserRouter } from 'react-router-dom';





function App() {
  return (
    <div className="App">
      <Routes />
    </div>

  );
}

export default App;
