<template>
  <div class="container">111111</div>
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

onMounted(() => {
  console.log("组件挂载了");
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
