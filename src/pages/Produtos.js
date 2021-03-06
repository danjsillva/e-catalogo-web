import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProdutoService from "../services/ProdutoService";
import LaboratorioService from "../services/LaboratorioService";
import CategoriaService from "../services/CategoriaService";

const emptyProduto = {
  nome: "",
  ean: "",
  descricao: "",
  laboratorios_id: "",
  categorias: [],
  imagem: null
};

export default function Produtos(props) {
  const [produto, setProduto] = useState(emptyProduto);
  const [produtos, setProdutos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedLaboratorio, setSelectedLaboratorio] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");

  useEffect(() => {
    fetchLaboratorios({});
    fetchCategorias({});
    fetchProdutos({});
  }, []);

  const fetchProdutos = async params => {
    let response = await ProdutoService.fetchProdutos(params);

    setProdutos(response);
  };

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

    setProduto(emptyProduto);
  };

  const removeProduto = async ({ id }) => {
    await ProdutoService.removeProduto({ id });

    fetchProdutos({});
  };

  const handleImageChange = async event => {
    setProduto({ ...produto, imagem: event.target.files[0] });
  };

  const handleInputChange = async event => {
    const { name, value } = event.target;

    setProduto({ ...produto, [name]: value });
  };

  const handleLaboratorioChange = async event => {
    const { value } = event.target;

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

  const handleRemoveClick = async id => {
    if (window.confirm("Esta operação não pode ser desfeita. Tem certeza?")) {
      removeProduto({ id });
    }
  };

  return (
    <section className="container">
      <article className="card my-5">
        <header className="card-header bg-white">
          <div className="form-row">
            <div className="col-6">
              <span className="font-weight-bold">Novo produto</span>
            </div>
            <div className="col-6 text-right">
              <Link to="/categorias" className="text-dar mr-4">
                Categorias
                {/* <i className="material-icons">local_offer</i> */}
              </Link>
              <Link to="/laboratorios" className="text-dar">
                Laboratórios
                {/* <i className="material-icons">assignment</i> */}
              </Link>
            </div>
          </div>
        </header>

        <main className="card-body">
          <form onSubmit={e => handleFormSubmit(e)}>
            <input
              type="file"
              name="imagem"
              onChange={e => handleImageChange(e)}
              required
              className=""
            />

            <input
              type="text"
              name="nome"
              value={produto.nome}
              onChange={e => handleInputChange(e)}
              required
              placeholder="Nome do produto"
              className="form-control form-control-sm mt-2"
            />

            <input
              type="text"
              name="ean"
              value={produto.ean}
              onChange={e => handleInputChange(e)}
              required
              placeholder="EAN ou código interno do produto"
              className="form-control form-control-sm mt-2"
            />

            <input
              type="text"
              name="descricao"
              value={produto.descricao}
              onChange={e => handleInputChange(e)}
              required
              placeholder="Descrição do produto"
              className="form-control form-control-sm mt-2"
            />

            <select
              name="selectedLaboratorio"
              value={selectedLaboratorio}
              onChange={e => handleLaboratorioChange(e)}
              required
              className="form-control form-control-sm mt-2"
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

            <div className="form-row mt-2">
              <div className="col-10">
                <select
                  name="selectedCategoria"
                  value={selectedCategoria}
                  onChange={e => handleCategoriaChange(e)}
                  required
                  className="form-control form-control-sm"
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
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary btn-block"
                  onClick={e => handleCategoriaAdd(e)}
                  disabled={!selectedCategoria}
                >
                  +
                </button>
              </div>
            </div>

            {produto.categorias.map(categoria => (
              <span
                className="badge badge-pill badge-primary mt-2 mr-2"
                key={categoria.id}
              >
                {categoria.nome}
              </span>
            ))}

            <button
              type="submit"
              className="btn btn-sm btn-primary btn-block mt-3"
            >
              Enviar
            </button>
          </form>
        </main>
      </article>

      <article className="card my-5">
        <header className="card-header bg-white">
          <span className="font-weight-bold">Produtos</span>
        </header>

        {produtos.map(produto => (
          <main className="card-body border-bottom py-2">
            <div className="form-row">
              <div className="col-1">{produto.id}</div>
              <div className="col-10">
                {produto.nome}
                <div className="text-muted">{produto.ean} {produto.laboratorio.nome}</div>
              </div>
              <div
                className="col-1 text-right text-danger pointer"
                onClick={e => handleRemoveClick(produto.id)}
              >
                <i className="material-icons">remove_circle_outline</i>
              </div>
            </div>
          </main>
        ))}

        <footer className="card-footer">{produtos.length} resultados</footer>
      </article>
    </section>
  );
}
