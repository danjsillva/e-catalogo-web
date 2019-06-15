import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Header from "./components/Header";

import AuthService from "./services/AuthService";

import "./App.scss";

export const AppContext = createContext({});

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkIsLogged();
  }, []);

  const checkIsLogged = async () => {
    let check = await AuthService.isLogged();

    setIsLogged(check);
  };

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged }}>
      <BrowserRouter>
        <Header />

        <Routes />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
