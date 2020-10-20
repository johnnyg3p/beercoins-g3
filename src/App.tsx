import React from 'react';
import './App.css';
import SideBar from './sideBar';
import SignIn from './screens/SignIn'
import './App.css';
import Routes from './routes';
import Statement from './components/statement/statement';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideBar moderator={true}/>
      </header>
      <Routes />
    </div>

  );
}

export default App;
