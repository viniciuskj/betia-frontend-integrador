import api from './api';
import Cookies from 'js-cookie';

const TOKEN_EXPIRES_IN = 1; // dias ate expirar

/**
 * Realiza login do usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} - Retorna os dados do usuário em caso de sucesso
 */

const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });

    if (response.data && response.data.token) {
      Cookies.set('token', response.data.token, {
        expires: TOKEN_EXPIRES_IN,
      });
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    // console.error('Erro ao fazer login:', error);

    return {
      success: false,
      message:
        error.response?.data?.error || 'Erro desconhecido. Tente novamente.',
    };
  }
};

export default login;
