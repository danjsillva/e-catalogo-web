import React, { useState, useEffect } from "react";

import CategoriaService from "../services/CategoriaService";

export default function Categorias(props) {
  const [categoria, setCategoria] = useState({
    nome: ""
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias({});
  }, []);

  const fetchCategorias = async params => {
    let response = await CategoriaService.fetchCategorias(params);

    setCategorias(response);
  };

  const saveCategoria = async ({ data }) => {
    await CategoriaService.saveCategoria({ data });

    setCategoria({});

    fetchCategorias({});
  };

  const handleInputChange = async event => {
    const { name, value } = event.target;

    setCategoria({ ...categoria, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    saveCategoria({ data: categoria });
  };

  return (
    <section className="container">
      <article className="card my-5 rounded-0">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Novo categoria</span>
        </header>

        <main className="card-body">
          <form onSubmit={e => handleFormSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                name="nome"
                value={categoria.nome}
                onChange={e => handleInputChange(e)}
                required
                placeholder="Nome da categoria"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-4">
              Enviar
            </button>
          </form>
        </main>
      </article>

      <article className="card my-5 rounded-0">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Categorias</span>
        </header>

        {categorias.map(categoria => (
          <main className="card-body py-2">
            <div className="form-row">
              <div className="col-11">{categoria.nome}</div>
              <div className="col-1 text-right text-danger">
                <i className="material-icons">remove_circle_outline</i>
              </div>
            </div>
          </main>
        ))}

        <footer className="card-footer">{categorias.length} resultados</footer>
      </article>
    </section>
  );
}
