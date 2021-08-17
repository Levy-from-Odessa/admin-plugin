<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="d-flex justify-content-between">
        <div>
          {{ new Date().getFullYear() - 1 }} -
          {{ new Date().getFullYear() }}
        </div>
        <h5>{{version}}V</h5>
      </div>
    </div>
  </footer>
  <!-- end footer -->
</template>
<script>

export default {
  name: 'FtthFooter',
  props: {
    version: {
      type: String,
      default: () => '0',
    },
  },
};
</script>

