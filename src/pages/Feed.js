import React, { useState, useEffect } from "react";
import { Instagram } from "react-content-loader";

import { apiURL } from "../config/api";
import ProdutoService from "../services/ProdutoService";

export default function Feed(props) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos({});
  }, []);

  async function fetchProdutos(params) {
    let response = await ProdutoService.fetchProdutos(params);

    setProdutos(response);
  }

  return (
    <section className="container">
      {produtos.map(produto => (
        <article className="card my-5" key={produto.id}>
          <header className="card-header bg-white">
            <div className="form-row">
              <div className="col-11">
                <span className="font-weight-bold d-block">{produto.nome}</span>
                <span className="text-muted d-block">{produto.ean}</span>
              </div>
              <div className="col-1 text-right">
                <span>
                  <i className="fa fa-ellipsis-h" />
                </span>
              </div>
            </div>
          </header>

          <main className="card-body p-0">
            <img
              className="w-100"
              src={`${apiURL}${produto.url_imagem}`}
              alt="placeholder"
            />
          </main>

          <footer className="card-footer bg-white">
            <div className="mb-2">
              <span className="badge badge-pill badge-primary mr-2">
                Medicamento
              </span>
              {produto.categorias.map(categoria => (
                <span
                  className="badge badge-pill badge-primary mr-2"
                  key={categoria.nome}
                >
                  {categoria.nome}
                </span>
              ))}
            </div>

            <span className="font-weight-bold">{produto.laboratorio.nome}</span>

            <p className="card-description">{produto.descricao}</p>
          </footer>
        </article>
      ))}
    </section>
  );
}
