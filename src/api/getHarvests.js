import api from './axios';

/**
// Realiza um get
 * @returns {Promise} - Retorna os dados do usuário em caso de sucesso
 */

const getHarvests = async (id) => {
  try {
    const response = await api.get(`/users/${id}/harvests`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.error('Erro ao fazer login:', error);

    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro desconhecido. Tente novamente.',
    };
  }
};

export default getHarvests;
