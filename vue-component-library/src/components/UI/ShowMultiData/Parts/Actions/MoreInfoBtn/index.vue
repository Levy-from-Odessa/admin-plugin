<template>
  <b-button 
    size="sm" 
    @click="$emit('toggle', row)" 
    class="ml-2" 
    variant="outline-light"
  >
    <i :class="`fas 
      fa-chevron-${ row.detailsShowing ? 'up' : 'down'}`"
    />
  </b-button>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>