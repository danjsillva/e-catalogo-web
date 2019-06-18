import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

import { apiURL } from "../config/api";
import ProdutoService from "../services/ProdutoService";

export default function Feed(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos({});
  }, []);

  async function fetchProdutos(params) {
    setIsLoading(true);

    let response = await ProdutoService.fetchProdutos(params);

    setProdutos(response);
    setIsLoading(false);
  }

  return (
    <section className="container">
      {isLoading && (
        <article className="card my-5">
          <header className="card-header bg-white">
            <div className="form-row">
              <div className="col-11">
                <ContentLoader height={36}>
                  <rect x="0" y="8" rx="4" ry="4" width="300" height="10" />
                  <rect x="0" y="24" rx="3" ry="3" width="250" height="10" />
                </ContentLoader>
              </div>
              <div className="col-1 text-right">
                <span>
                  <i className="fa fa-ellipsis-h" />
                </span>
              </div>
            </div>
          </header>

          <main className="card-body p-0">
            <ContentLoader height={280}>
              <rect x="0" y="0" rx="0" ry="0" width="580" height="100%" />
            </ContentLoader>
          </main>

          <footer className="card-footer bg-white">
            <ContentLoader height={24}>
              <rect x="0" y="8" rx="3" ry="3" width="90" height="10" />
              <rect x="100" y="8" rx="3" ry="3" width="110" height="10" />
              <rect x="220" y="8" rx="3" ry="3" width="90" height="10" />
            </ContentLoader>

            <ContentLoader height={16}>
              <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>

            <ContentLoader height={16}>
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="10" />
            </ContentLoader>
          </footer>
        </article>
      )}

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
              src={`http://walacesilva.com.br/wp-content/uploads/2019/01/blog0.png`}
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
