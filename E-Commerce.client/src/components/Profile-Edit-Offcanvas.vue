<template>
  <div class="offcanvas offcanvas-end bg-primary" id="EditProfileOffCanvas">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Profile Details</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        title="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="card h-100 bg-grey">
        <div class="card-body">
          <div class="row">
            <div class="col-12" v-if="edit == false">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-content-end align-items-center">
                    <div
                      class="m-1 edit action"
                      @click="editToggle()"
                      title="Edit Profile"
                    >
                      <i class="mdi mdi-pencil" />
                      Edit Profile
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="img">
                    <img
                      :src="account.picture"
                      alt="Profile Picture"
                      class="elevation-3 m-3 profile-pic"
                    />
                  </div>
                  <div class="text-center details-title">Name:</div>
                  <div class="text-center name">{{ account.name }}</div>
                  <div class="text-center mt-4 details-title">Email:</div>
                  <div class="text-center email">{{ account.email }}</div>
                </div>
              </div>
            </div>
            <div class="col-12" v-if="edit == true">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-content-end align-items-center">
                    <div class="m-1 edit action" @click="editToggle()">
                      <i class="mdi mdi-pencil" />
                      Edit Profile
                    </div>
                  </div>
                </div>
                <form @submit.prevent="editAccount()">
                  <div class="col-12">
                    <div class="img">
                      <img
                        :src="accountDetails.picture"
                        alt=""
                        class="elevation-3 m-3 profile-pic"
                      />
                    </div>
                    <div class="text-center details-title">Name:</div>
                    <input
                      type="text"
                      class="form-control text-center name"
                      v-model="accountDetails.name"
                      maxlength="40"
                      minlength="1"
                    />
                    <div class="text-center mt-4 details-title">
                      Profile Picture:
                    </div>
                    <input
                      type="text"
                      class="form-control text-center picture"
                      v-model="accountDetails.picture"
                      minlength="1"
                    />
                  </div>
                  <div class="col-12">
                    <button
                      type="submit"
                      class="btn w-100 btn-success mt-3 submit text-white"
                      title="Update Profile"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom">
                <router-link :to="{ name: 'Account' }">
                  <button
                    class="btn btn-primary mb-2 w-100 text-white"
                    title="Account Page"
                  >
                    Account Page
                  </button>
                </router-link>
                <button
                  class="btn btn-danger w-100"
                  @click="logout()"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    let accountDetails = ref({});
    watchEffect(() => {
      accountDetails.value = { ...AppState.account };
    });
    const edit = ref(false);
    return {
      edit,
      accountDetails,
      account: computed(() => AppState.account),
      editToggle() {
        edit.value = !edit.value;
      },
      logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
      async editAccount() {
        try {
          await accountService.editAccount(accountDetails.value);
          Pop.toast("Account Updated", "success");
          edit.value = false;
        } catch (error) {
          logger.error(error.Message);
          Pop.toast(error.Message);
        }
      },
    };
  },
};
</script>
<style scoped>
.bottom {
  position: absolute;
  bottom: 1vh;
  width: 95%;
  left: 1vh;
  right: 1vh;
}
.profile-pic {
  height: 15vh;
  width: 15vh;
  object-fit: cover;
}
.picture {
  font-size: 1.2vh;
  color: black;
}
.img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.name {
  font-size: 2.2vh;
  color: black;
}
.email {
  font-size: 1.8vh;
  color: black;
}
.details-title {
  color: black;
  font-weight: bold;
}
.submit {
  color: white;
}
.edit {
  color: black;
}
</style>
