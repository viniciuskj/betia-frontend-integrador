import api from './api';
import type { AxiosError } from 'axios';

import Cookies from 'js-cookie';

const updateSubscription = async (subscription_plan_id: number) => {
  try {
    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const response = await api.put(`/users/${userId}/subscription`, {
      subscription_plan_id,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.error('Erro ao alterar plano:', error);
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message:
        err.response?.data?.message || 'Erro desconhecido. Tente novamente.',
    };
  }
};

export default updateSubscription;
