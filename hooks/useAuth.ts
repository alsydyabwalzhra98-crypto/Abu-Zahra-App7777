export const useAuth = () => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateBalance: () => {},
  clearError: () => {},
});
