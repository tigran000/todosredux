import React from "react";
import ToDos from "../components/ToDos";
import Lists from "../components/Lists";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Lists />
      <ToDos />
    </div>
  );
}

export default App;
