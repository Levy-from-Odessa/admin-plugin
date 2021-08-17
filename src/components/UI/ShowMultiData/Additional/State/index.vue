<template>
  <span 
    :class="chipClass(color)"
    @click="$emit('click', compareItem)"
    role="button"
   >
      <span v-if="!slotExist('additionalText')">
        {{text}}
      </span>
      <slot 
        v-else
        name="additionalText" 
      />
  </span>
</template>

<script>

export default {
  name: 'FtthState',
  props: {
    customEnum: {
      type: Object,
      default: () => ({
        true: {
          color: 'success',
          text: 'true',
        },
        false: {
          color: 'danger',
          text: 'false',
        },
      }),
    },
    compareItem: {
      type: [String, Number, Boolean],
      default: () => '',
    },
    default: {
      type: Boolean,
      default: false,
    }

  },

  computed: {
    color() {
      const { customEnum, compareItem } = this;
      if (this.default) {
        return 'secondary'
      }
      return customEnum[compareItem].color;
    },
    text() {
      const { customEnum, compareItem } = this;
      if (this.default) {
        return compareItem
      }
      return customEnum[compareItem].text;
    },

  },

  methods: {
    slotExist(name){
      return typeof this.$scopedSlots[name] !== 'undefined'
    },
    chipClass(color){
      return `
            p-2
            fw-bold
            mx-2
            badge
            bg-${color}
            m-1
      `
    }
  }
};
</script>

<style lang="scss" module>
.State{
  color: initial;
  background: initial;
}
</style>
