<template>
  <div class="modal fade" id="createModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="create()">
          <div class="modal-header">
            <h5 class="modal-title">Create a Posting</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <input type="text" class="h-100 w-100" v-model="form.name" />
              </div>
              <div class="col-md-6 col-sm-12">
                <textarea
                  type="text"
                  class="h-100 w-100"
                  v-model="form.description"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
export default {
  name: "Create Modal",
  setup() {
    const form = ref({});
    return {
      form,

      async create() {
        try {
          console.log(form.value.name);
          form.value.name = "";
        } catch (error) {
          Pop.toast(error);
        }
      },
    };
  },
};
</script>

<style scoped lang="scss"></style>
