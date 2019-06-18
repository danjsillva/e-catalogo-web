import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Produtos from "./pages/Produtos";
import Laboratorios from "./pages/Laboratorios";
import Categorias from "./pages/Categorias";

import { AppContext } from "./App";

export default function Routes(props) {
  const context = useContext(AppContext);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Feed} />

      {context.isLogged && (
        <>
          <Route path="/produtos" component={Produtos} />
          <Route path="/laboratorios" component={Laboratorios} />
          <Route path="/categorias" component={Categorias} />
        </>
      )}

      <Route
        component={() => (
          <div className="container mt-5">
            <span className="font-weight-bold">Erro 401.</span> Página não
            encontrada.
          </div>
        )}
      />
    </Switch>
  );
}
