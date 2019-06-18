import API from "../config/api";

export default {
  fetchCategorias: async ({ busca = "", ativo = "" }) => {
    try {
      let response = (await API.get(`/categorias?busca=${busca}`)).data;

      return response;
    } catch (error) {
      console.error(error);

      return [];
    }
  },

  saveCategoria: async ({ data }) => {
    try {
      let response;

      if (!!data.idproduto) {
        response = (await API.put(`/categorias/${data.idproduto}`, data)).data;
      } else {
        response = (await API.post(`/categorias`, data)).data;
      }

      return response;
    } catch (error) {
      console.error(error);

      return {};
    }
  },

  removeCategoria: async ({ id }) => {
    try {
      let response = (await API.delete(`/categorias/${id}`)).data;

      return response;
    } catch (error) {
      console.error(error);

      return {};
    }
  }
};
