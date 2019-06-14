import API from "../config/api";

export default {
  fetchProdutos: async ({ busca = "", ativo = "" }) => {
    try {
      let response = (await API.get(`/produtos?busca=${busca}`)).data;

      return response;
    } catch (error) {
      console.error(error.response.data);

      return [];
    }
  },

  saveProduto: async ({ data }) => {
    try {
      let response;

      if (!!data.idproduto) {
        response = (await API.put(`/produtos/${data.idproduto}`, data)).data;
      } else {
        response = (await API.post(`/produtos`, data)).data;
      }

      return response;
    } catch (error) {
      console.error(error.response.data);

      return {};
    }
  },

  removeProduto: async ({ id }) => {
    try {
      let response = (await API.delete(`/produtos/${id}`)).data;

      return response;
    } catch (error) {
      console.error(error.response.data);

      return {};
    }
  }
};
