import React from 'react';
import './App.css';
import SideBar from './sideBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideBar moderator={true}/>
        <h1>BEER COIN</h1>
      </header>
    </div>
  );
}

export default App;
