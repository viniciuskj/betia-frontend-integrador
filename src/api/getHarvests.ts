import api from './api';
import Cookies from 'js-cookie';

/**
// Realiza um get
 * @returns {Promise} - Retorna os dados do usuário em caso de sucesso
 */

const getHarvests = async () => {
  try {
    const id = Cookies.get('userId');

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
