import React from "react";
import "./App.css";
import Movies from "./components/movies";

function App() {
  return (
    <main className="container">
      <h1>My list of Movies.</h1>
      <Movies />
    </main>
  );
}

export default App;
