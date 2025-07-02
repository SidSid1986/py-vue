import axios from "axios";
import { useAuthStore } from "@/store/auth"; // 导入 Pinia 的 authStore

// 创建 axios 实例
const service = axios.create({
  baseURL: "/", // 根据实际情况修改
  headers: { "Content-Type": "application/json;charset=utf-8" },
  timeout: 30000,
  port: 5173,
});

// 请求拦截器：自动为请求添加 Token
// 请求拦截器：自动为请求添加 Token（排除登录接口）
service.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    // 优先从localStorage读取（更可靠，因为Pinia可能未及时更新）
    const tokenFromStorage = localStorage.getItem('token');
    
    if (config.url !== '/api/login' && tokenFromStorage) { // 关键：改用localStorage判断
      config.headers.Authorization = `Bearer ${tokenFromStorage}`;
    } else if (config.url !== '/api/login' && authStore.token) { // 备用：Pinia的token
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response + "response");
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
