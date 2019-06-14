import React, { useState, useEffect } from "react";

import LaboratorioService from "../services/LaboratorioService";

export default function Laboratorios(props) {
  const [laboratorio, setLaboratorio] = useState({
    nome: ""
  });
  const [laboratorios, setLaboratorios] = useState([]);

  const fetchLaboratorios = async params => {
    let response = await LaboratorioService.fetchLaboratorios(params);

    setLaboratorios(response);
  };

  const saveLaboratorio = async ({ data }) => {
    await LaboratorioService.saveLaboratorio({ data });

    setLaboratorio({});
  };

  const handleInputChange = async event => {
    const { name, value } = event.target;

    setLaboratorio({ ...laboratorio, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    saveLaboratorio({ data: laboratorio });
  };

  return (
    <section className="container">
      <article className="card my-5 rounded-0">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Novo laboratório</span>
        </header>

        <main className="card-body">
          <form onSubmit={e => handleFormSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                name="nome"
                value={laboratorio.nome}
                onChange={e => handleInputChange(e)}
                required
                placeholder="Nome do laboratório"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-4">
              Enviar
            </button>
          </form>
        </main>

        <footer className="card-footer p-0" />
      </article>
    </section>
  );
}
