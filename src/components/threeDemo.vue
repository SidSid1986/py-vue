<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = ref(null);

onMounted(() => {
  // 1. 初始化场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222); // 深色背景更易观察
  
  const camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.set(1, 2, 3); // 调整初始相机位置

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // 2. 添加光源（必须！否则模型可能是黑的）
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // 3. 加载模型（Vite专用路径写法）
  const loader = new GLTFLoader();
  loader.load(
    new URL('../assets/tetris_factory.glb', import.meta.url).href,
    (gltf) => {
      scene.add(gltf.scene);
      console.log("✅ 模型加载成功", gltf);
      
      // 自动聚焦模型
      const bbox = new THREE.Box3().setFromObject(gltf.scene);
      const center = bbox.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    },
    undefined,
    (error) => {
      console.error("❌ 加载失败:", error);
    }
  );

  // 4. 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 5. 动画循环
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 80vh;
  border: 2px solid red; /* 保留边框用于调试 */
}
</style>