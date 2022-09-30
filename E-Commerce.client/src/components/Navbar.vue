<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
    <router-link
      class="navbar-brand d-flex"
      title="Route to the Home Page"
      :to="{ name: 'Home' }"
    >
      <div class="d-flex align-items-center">
        <!-- <img
          alt="logo"
          src="../assets/img/KnightsIcon.jpg"
          height="40"
          class="rounded elevation-2"
        /> -->
        <span class="mx-3 text-shadow lighten-25 text-uppercase"
          >E-Commerce</span
        >
      </div>
    </router-link>
    <div class="collapse navbar-collapse" id="navbarText"></div>
    <span class="navbar-text pe-3">
      <button
        class="btn btn-outline-warning text-shadow selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div class="dropdown my-2 my-lg-0 dropstart" v-else>
        <div class="selectable rounded elevation-2" @click="editProfile">
          <img
            :src="account.picture"
            alt="user photo"
            height="40"
            class="rounded profile-pic"
          />
          <!-- <span class="mx-3 text-success lighten-30 text-shadow">
            {{ account.name }}
          </span> -->
        </div>
      </div>
    </span>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
import { Modal, Offcanvas } from "bootstrap";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      editProfile() {
        Offcanvas.getOrCreateInstance(
          document.getElementById("EditProfileOffCanvas")
        ).toggle();
      },
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
.profile-pic {
  width: 35px;
  height: 35px;
  object-fit: cover;
}
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.bottom-border {
  border-bottom: 2px solid var(--bs-secondary);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.navbar-clear {
  background-color: none;
}
</style>
