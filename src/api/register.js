import api from './axios';
import Cookies from 'js-cookie';

const TOKEN_EXPIRES_IN = 1; // days

/**
 
Realiza cadastro do usuário,
@param {Object} userData,
@param {string} userData.name,
@param {string} userData.email,
@param {string} userData.password,
@param {Object} userData.address,
@param {string} userData.address.street,
@param {string} userData.address.city,
@param {string} userData.address.state,
@param {string} userData.address.country,
@param {string} userData.address.zip_code,
@returns {Promise}*/

const register = async userData => {
  try {
    const response = await api.post('/users', userData);

    if (response.data && response.data.token) {
      Cookies.set('token', response.data.token, {
        expires: TOKEN_EXPIRES_IN,
      });
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro desconhecido. Tente novamente.',
    };
  }
};

export default register;