// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null, // Token 存储在内存中
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    clearToken() {
      this.token = null;
    },
  },

  persist: {
    // 关键：添加持久化配置
    key: "auth-token", // 存储的键名（默认是store的id）
    storage: localStorage, // 默认就是localStorage，可选sessionStorage或自定义存储
    // 可选配置：过期时间、加密等（需配合其他库）
  },
});
