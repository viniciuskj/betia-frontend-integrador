import api from './api';

const getUserData = async () => {
  try {
    const response = await api.get(`/users`);

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

export default getUserData;
