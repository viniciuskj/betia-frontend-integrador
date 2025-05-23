import api from './api';

const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);

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

export default getUserById;
