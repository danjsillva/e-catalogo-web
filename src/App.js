import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Header from "./components/Header";

import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes />
      </BrowserRouter>
    </div>
  );
}
