<template>
  <img :src="resultImage">
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    static: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    resultImage () {
      return this.static ? this.imageUrl : this.getImgUrl(this.imageUrl)
    }
  },
  methods: {
    getImgUrl (img) {
      return(require('@/assets/images/layouts/'+ img));
    }
  }
}
</script>

<style lang="scss" module>
</style>
