import API from "../config/api";

export default {
  fetchLaboratorios: async ({ busca = "", ativo = "" }) => {
    try {
      let response = (await API.get(`/laboratorios?busca=${busca}`)).data;

      return response;
    } catch (error) {
      console.error(error.response.data);

      return [];
    }
  },

  saveLaboratorio: async ({ data }) => {
    try {
      let response;

      if (!!data.idproduto) {
        response = (await API.put(`/laboratorios/${data.idproduto}`, data))
          .data;
      } else {
        response = (await API.post(`/laboratorios`, data)).data;
      }

      return response;
    } catch (error) {
      console.error(error.response.data);

      return {};
    }
  },

  removeLaboratorio: async ({ id }) => {
    try {
      let response = (await API.delete(`/laboratorios/${id}`)).data;

      return response;
    } catch (error) {
      console.error(error.response.data);

      return {};
    }
  }
};
