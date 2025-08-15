import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://do-it-rogd.onrender.com";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  signup: async (name, email, password) => {
    try {
      set({ isLoading: true });

      const res = await axios.post(`${API_BASE_URL}/api/user/signup`, {
        name,
        email,
        password,
      });

      const data = res.data;

      // Only save if token exists
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        set({ token: data.token });
      }

      if (data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        set({ user: data.user });
      }

      set({ isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      console.error("Registration error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true });

      const res = await axios.post(`${API_BASE_URL}/api/user/login`, {
        email,
        password,
      });

      const data = res.data;
    
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        set({ token: data.token });
      }

      if (data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        set({ user: data.user });
      }

      set({ isLoading: false });

      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      console.error("Login error:", err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  },

 checkAuth: async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userJSON = await AsyncStorage.getItem("user");

    let user = null;
    if (userJSON) {
      try {
        user = JSON.parse(userJSON);
      } catch (parseError) {
        console.warn("Failed to parse user from storage:", parseError);
        user = null;
      }
    }

    if (token && user) {
      set({ token, user });
    } else {
      set({ token: null, user: null });
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    set({ token: null, user: null });
  }
},

logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null });
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  },

}));