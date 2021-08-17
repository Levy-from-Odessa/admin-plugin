<template>
    <div
      style="cursor: pointer"
      @click="$emit('setOrder', headerOrderName)"
    >
      {{ header.label }}
      <template v-if="query[`order[${headerOrderName}]`]">
        <i :class="`
          fas
          fa-sort-amount-${
            query[`order[${headerOrderName}]`] === 'ASC'
            ? 'down'
            : 'up'
            }
            `"></i>
      </template>
    </div>
</template>

<script>
export default {
	name: 'FtthTableHeaderItem',
  props: {
    header: {
      type: Object,
      default: () => {}
    },
    query: {
      type: [Object, String],
      default: () => {},
    },
  },
  computed: {
    headerOrderName() {
			const {orderName, key} = this.header
      return orderName || key;
    },
  },

};
</script>

<style lang="scss" scoped>

</style>