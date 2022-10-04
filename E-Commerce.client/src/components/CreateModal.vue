<template>
  <div class="modal fade" id="createModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create a Posting</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary text-white">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Create Modal",
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
