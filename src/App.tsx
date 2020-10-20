import React from "react";
import "./App.css";
import SideBar from "./sideBar";
import "./App.css";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideBar moderator={true} />
      </header>
      <Routes />
    </div>
  );
}

export default App;
