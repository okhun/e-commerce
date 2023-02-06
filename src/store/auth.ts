import { defineStore } from "pinia";
import { getItem, setItem } from "../utils/functions";
import { usePost } from "../api/fetch";

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    isLoading: false,
    user: (getItem("user") ? JSON.parse(getItem("user")) : {}) as Record<
      string,
      any
    >,
    token: {
      access: getItem("Authorization") ? getItem("Authorization") : "",
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.token.access,
  },
  actions: {
    login(payload: any) {
      this.isLoading = true;
      usePost("auth/login", payload)
        .then((data) => {
          const { token } = data;
          this.token.access = token;
          setItem("Authorization", token);
          this.router.push({ name: "home" });
        })
        .finally(() => (this.isLoading = false));
    },
    logout() {
      localStorage.clear();
      this.token = {
        access: "",
      };
      this.user = {};
    },
  },
});
