import React from "react";
import SimpleCard from "./main";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <SimpleCard />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
