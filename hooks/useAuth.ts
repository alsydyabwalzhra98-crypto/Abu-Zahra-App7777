export const useAuth = () => {
  return {
    user: null,
    token: null,
    loading: false,
    error: null,
    login: async () => {},
    signup: async () => {},
    logout: () => {},
    updateBalance: () => {},
    clearError: () => {},
  };
};
