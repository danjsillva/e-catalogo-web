import React, { useState, useEffect } from "react";

import ProdutoService from "../services/ProdutoService";
import LaboratorioService from "../services/LaboratorioService";
import CategoriaService from "../services/CategoriaService";

export default function Produtos(props) {
  const [produto, setProduto] = useState({
    nome: "",
    ean: "",
    descricao: "",
    laboratorios_id: "",
    categorias: [],
    imagem: null
  });
  const [laboratorios, setLaboratorios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedLaboratorio, setSelectedLaboratorio] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");

  useEffect(() => {
    fetchLaboratorios({});
    fetchCategorias({});
  }, []);

  const fetchLaboratorios = async params => {
    let response = await LaboratorioService.fetchLaboratorios(params);

    setLaboratorios(response);
  };

  const fetchCategorias = async params => {
    let categorias = await CategoriaService.fetchCategorias(params);

    setCategorias(categorias);
  };

  const saveProduto = async ({ data }) => {
    await ProdutoService.saveProduto({ data });

    setProduto({});
  };

  const handleImageChange = async event => {
    setProduto({ ...produto, imagem: event.target.files[0] });
  };

  const handleInputChange = async event => {
    const { name, value } = event.target;

    setProduto({ ...produto, [name]: value });
  };

  const handleLaboratorioChange = async event => {
    const { name, value } = event.target;

    setSelectedLaboratorio(value);

    setProduto({ ...produto, laboratorios_id: value });
  };

  const handleCategoriaChange = async event => {
    const { value } = event.target;

    setSelectedCategoria(value);
  };

  const handleCategoriaAdd = async event => {
    if (
      !produto.categorias.find(
        categoria => categoria.id === parseInt(selectedCategoria)
      )
    ) {
      setProduto({
        ...produto,
        categorias: [
          ...produto.categorias,
          categorias.find(
            categoria => categoria.id === parseInt(selectedCategoria)
          )
        ]
      });
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const data = new FormData();

    data.append("nome", produto.nome);
    data.append("ean", produto.ean);
    data.append("descricao", produto.descricao);
    data.append("laboratorios_id", produto.laboratorios_id);
    data.append("categorias", produto.categorias);
    data.append("imagem", produto.imagem);

    saveProduto({ data });
  };

  return (
    <section className="container">
      <article className="card my-5 rounded-0">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Novo produto</span>
        </header>

        <main className="card-body">
          <form onSubmit={e => handleFormSubmit(e)}>
            <div className="form-group">
              <input
                type="file"
                name="imagem"
                onChange={e => handleImageChange(e)}
                required
                placeholder="Selecione a imagem do produto"
                className="form-file w-100"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="nome"
                value={produto.nome}
                onChange={e => handleInputChange(e)}
                required
                placeholder="Nome do produto"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="ean"
                value={produto.ean}
                onChange={e => handleInputChange(e)}
                required
                placeholder="EAN ou código interno do produto"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="descricao"
                value={produto.descricao}
                onChange={e => handleInputChange(e)}
                required
                placeholder="Descrição do produto"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <select
                name="selectedLaboratorio"
                value={selectedLaboratorio}
                onChange={e => handleLaboratorioChange(e)}
                required
                className="form-control"
              >
                <option value="" disabled>
                  Selecione o laboratório
                </option>
                {laboratorios.map(laboratorio => (
                  <option value={laboratorio.id} key={laboratorio.id}>
                    {laboratorio.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="col-10">
                <div className="form-group">
                  <select
                    name="selectedCategoria"
                    value={selectedCategoria}
                    onChange={e => handleCategoriaChange(e)}
                    required
                    className="form-control"
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0
                    }}
                  >
                    <option value="" disabled>
                      Selecione a categoria
                    </option>
                    {categorias.map(categoria => (
                      <option value={categoria.id} key={categoria.id}>
                        {categoria.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block"
                  onClick={e => handleCategoriaAdd(e)}
                  disabled={!selectedCategoria}
                >
                  +
                </button>
              </div>
            </div>

            {produto.categorias.map(categoria => (
              <span
                className="badge badge-pill badge-primary mr-2"
                key={categoria.id}
              >
                {categoria.nome}
              </span>
            ))}

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
