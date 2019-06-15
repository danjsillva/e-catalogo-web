import React, { useState, useEffect } from "react";

import LaboratorioService from "../services/LaboratorioService";

const emptyLaboratorio = {
  nome: ""
};

export default function Laboratorios(props) {
  const [laboratorio, setLaboratorio] = useState(emptyLaboratorio);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    fetchLaboratorios({});
  }, []);

  const fetchLaboratorios = async params => {
    let response = await LaboratorioService.fetchLaboratorios(params);

    setLaboratorios(response);
  };

  const saveLaboratorio = async ({ data }) => {
    await LaboratorioService.saveLaboratorio({ data });

    setLaboratorio(emptyLaboratorio);

    fetchLaboratorios({});
  };

  const removeLaboratorio = async ({ id }) => {
    await LaboratorioService.removeLaboratorio({ id });

    fetchLaboratorios({});
  };

  const handleInputChange = async event => {
    const { name, value } = event.target;

    setLaboratorio({ ...laboratorio, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    saveLaboratorio({ data: laboratorio });
  };

  const handleRemoveClick = async id => {
    if (window.confirm("Esta operação não pode ser desfeita. Tem certeza?")) {
      removeLaboratorio({ id });
    }
  };

  return (
    <section className="container">
      <article className="card my-5 rounded-0">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Novo laboratório</span>
        </header>

        <main className="card-body">
          <form onSubmit={e => handleFormSubmit(e)}>
            <input
              type="text"
              name="nome"
              value={laboratorio.nome}
              onChange={e => handleInputChange(e)}
              required
              placeholder="Nome do laboratório"
              className="form-control form-control-sm"
            />

            <button
              type="submit"
              className="btn btn-sm btn-primary btn-block mt-3"
            >
              Enviar
            </button>
          </form>
        </main>
      </article>

      <article className="card my-5 rounded-0">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Laboratórios</span>
        </header>

        {laboratorios.map(laboratorio => (
          <main className="card-body border-bottom py-2">
            <div className="form-row">
              <div className="col-1">{laboratorio.id}</div>
              <div className="col-10">
                {laboratorio.nome}
                <div className="text-muted">0 produtos</div>
              </div>
              <div
                className="col-1 text-right text-danger pointer"
                onClick={e => handleRemoveClick(laboratorio.id)}
              >
                <i className="material-icons">remove_circle_outline</i>
              </div>
            </div>
          </main>
        ))}

        <footer className="card-footer">
          {laboratorios.length} resultados
        </footer>
      </article>
    </section>
  );
}
