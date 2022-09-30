<template>
  <div
    class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center"
    @click="createModal()"
  >
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img
        src="src\assets\img\Background image.jpg"
        alt="CodeWorks Logo"
        class="rounded-circle"
      />
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        E-Commerce
      </h1>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { Modal } from "bootstrap";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {});
    return {
      async createModal() {
        Modal.getOrCreateInstance(
          document.getElementById("createModal")
        ).toggle();
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
