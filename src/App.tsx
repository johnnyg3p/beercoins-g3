import React from 'react';
import SignIn from './screens/SignIn/SignIn'
import './App.css';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Routes />
      <SignIn />
    </div>
  );
}

export default App;
