import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      token: null,
      loading: true,
      error: null,
      login: async () => {},
      signup: async () => {},
      logout: () => {},
      updateBalance: () => {},
      clearError: () => {},
    };
  }
  return context;
};
