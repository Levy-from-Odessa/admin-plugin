<template>
    <b-spinner
      type="grow"
      class="Loader"
      variant="info"
      role="status"
    ></b-spinner>
</template>

<script>
export default {
  name: 'FtthMainLoader',
}
</script>


<style lang="css" >
.Loader{
  margin: 0 calc(50% - 2rem) !important;
}
</style>