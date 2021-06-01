<template>
    <a 
      class="is-parent" 
      :class="{ 'has-arrow': !item.badge, 'has-dropdown': item.badge }"
    >
        <i :class="`${item.icon}`" v-if="item.icon"></i>
        <span>{{ (item.label) }}</span>
        <span :class="`badge rounded-pill bg-${item.badge.variant} float-end`" v-if="item.badge">{{ $t(item.badge.text) }}</span>
    </a>
</template>

<script>


export default {
  name: 'FtthSideNavParent',
  props: {
    item:{
      type: Object,
      default: () => {}
    }
  },

  data(){
    return{

    }
  },

  computed:{

  },

  mounted(){

  }
}
</script>


<style lang="scss" module>
.PreIcon{
  color: initial;
  background: initial;
}
</style>