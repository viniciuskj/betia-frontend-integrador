import api from './api';
import Cookies from 'js-cookie';

const deleteHarvest = async (harvestId: number) => {
  try {
    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const response = await api.delete(`/users/${userId}/harvests/${harvestId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.error('Erro ao deletar safra:', error);

    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro desconhecido. Tente novamente.',
    };
  }
};
export default deleteHarvest;
