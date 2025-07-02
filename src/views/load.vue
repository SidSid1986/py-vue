<template>
  <div class="container">
    <div>{{ formPy }}</div>
    <el-button @click="loginFunc">登录</el-button>
    <el-button @click="logout">登出</el-button>
    <el-button @click="getListFunc">获取列表</el-button>
    <el-button @click="getListFuncPage">分页查询</el-button>

    <el-button @click="addListFunc">增加</el-button>
    <el-button @click="updateListFunc">修改</el-button>
    <el-button @click="deleteListFunc">删除</el-button>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  onUpdated,
  onBeforeUpdate,
  onUnmounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from "vue";
const myRef = ref(null);
const userData = reactive({
  username: "admin",
  password: "123456",
});

import {
  hello,
  addList,
  getList,
  deleteList,
  updateList,
  getListPage,
  login,
} from "@/api/common";

const formPy = ref("未获取到数据");
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore(); // 初始化 store

const loginFunc = async () => {
  try {
    const res = await login(userData);
    authStore.setToken(res.access_token); // 插件会自动持久化到localStorage
    // router.push("/dashboard"); // 跳转到仪表盘
  } catch (error) {
    console.error("登录失败:", error);
  }
};

const logout = () => {
  authStore.clearToken(); // 清除Pinia的token
  localStorage.removeItem('token'); // 清除localStorage的token
  console.log("登出后Token:", useAuthStore().token); // 应为null
  // router.push('/login');
};
function myMethod() {
  hello().then((res) => {
    console.log(res);
    formPy.value = res.message;
  });
}

const addListFunc = () => {
  console.log("addListFunc");
  const mydata = {
    title: "tittle test 2",
    done: true,
  };
  addList(mydata).then((res) => {
    console.log(res);
  });
};

const getListFunc = () => {
  console.log("getListFunc");
  getList().then((res) => {
    console.log(res);
  });
};

const getListFuncPage = () => {
  // 分页查询 传入页码和每页数量
  getListPage().then((res) => {
    console.log(res);
  });
};

const deleteListFunc = () => {
  console.log("deleteListFunc");
  deleteList(2).then((res) => {
    getListFunc();
  });
};

const updateListFunc = () => {
  console.log("updateListFunc");
  updateList(2, { title: "updateListFunc", done: true }).then((res) => {
    getListFunc();
  });
};

onMounted(() => {
  console.log("组件挂载了");
  myMethod();
});
onBeforeMount(() => {
  console.log("组件即将挂载");
});
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
  font-size: 20px;
}
</style>
