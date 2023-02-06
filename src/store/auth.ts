import { defineStore } from "pinia";
import { createUUID, getItem, setItem } from "@/utils/functions";

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  token: string;
}

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    isLoading: false,
    user: (getItem("user") ? JSON.parse(getItem("user")) : {}) as User | any,
    token: {
      access: getItem("Authorization") ? getItem("Authorization") : "",
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.token.access,
  },
  actions: {
    login(payload: any) {
      const users = getItem("users");

      if (users) {
        const tempUsers = JSON.parse(users);
        const user = tempUsers.find(
          (user: any) =>
            user.username === payload.username &&
            user.password === payload.password
        );
        if (user) {
          const { token } = user;
          this.token.access = token;
          this.user = user;
          setItem("Authorization", token);
          setItem("user", JSON.stringify(user));
          this.router.push({ name: "home" });
        }
      }
    },
    logout() {
      setItem("Authorization", "");
      this.token = {
        access: "",
      };
      this.user = {};
    },
    register(data: any) {
      let tempData = { ...data, token: "token", id: createUUID() };
      let users = getItem("users");
      if (users) {
        const tempUsers = JSON.parse(users);
        tempUsers.push(tempData);
        setItem("users", JSON.stringify(tempUsers));
      } else {
        setItem("users", JSON.stringify([tempData]));
      }
      this.router.push({ name: "login" });
    },
  },
});
