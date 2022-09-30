<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <Profile-Edit-Offcanvas />
  <CreateModal />
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
