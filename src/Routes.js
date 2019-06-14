import React from "react";
import { Switch, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import Produtos from "./pages/Produtos";
import Laboratorios from "./pages/Laboratorios";
import Categorias from "./pages/Categorias";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Feed} />
      <Route path="/produtos" component={Produtos} />
      <Route path="/laboratorios" component={Laboratorios} />
      <Route path="/categorias" component={Categorias} />
    </Switch>
  );
}
