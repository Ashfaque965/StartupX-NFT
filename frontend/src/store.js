import create from "zustand";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,

  // Login
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);

      set({
        token,
        user,
        error: null,
        isLoading: false,
      });

      return user;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Login failed",
        isLoading: false,
      });
      throw err;
    }
  },

  // Register
  register: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);

      set({
        token,
        user,
        error: null,
        isLoading: false,
      });

      return user;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Registration failed",
        isLoading: false,
      });
      throw err;
    }
  },

  // Get current user
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ isLoading: false });
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (err) {
      localStorage.removeItem("token");
      set({
        token: null,
        user: null,
        error: null,
        isLoading: false,
      });
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      error: null,
    });
  },

  // Link wallet
  linkWallet: async (walletAddress, signature, message) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/wallet/link`,
        { walletAddress, signature, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        user: {
          ...state.user,
          walletAddress: response.data.walletAddress,
        },
        error: null,
        isLoading: false,
      }));

      return response.data;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to link wallet",
        isLoading: false,
      });
      throw err;
    }
  },
}));

export const useWalletStore = create((set) => ({
  account: null,
  provider: null,
  signer: null,
  isConnecting: false,

  connectWallet: async () => {
    set({ isConnecting: true });
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      set({
        account: accounts[0],
        provider,
        signer,
        isConnecting: false,
      });

      return accounts[0];
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      set({ isConnecting: false });
      throw err;
    }
  },

  disconnectWallet: () => {
    set({
      account: null,
      provider: null,
      signer: null,
    });
  },
}));
