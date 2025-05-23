import api from './api';
import type { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const getUserById = async () => {
  try {
    const id = Cookies.get('userId');

    if (!id) {
      throw new Error('User ID not found in cookies');
    }

    const response = await api.get(`/users/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.error('Erro ao fazer login:', error);
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message:
        err.response?.data?.message || 'Erro desconhecido. Tente novamente.',
    };
  }
};

export default getUserById;
