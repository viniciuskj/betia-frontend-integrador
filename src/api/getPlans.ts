import api from './api';
import type { AxiosError } from 'axios';

const getPlans = async () => {
  try {
    const response = await api.get(`/subscription/plans`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message:
        err.response?.data?.message || 'Erro desconhecido. Tente novamente.',
    };
  }
};

export default getPlans;
