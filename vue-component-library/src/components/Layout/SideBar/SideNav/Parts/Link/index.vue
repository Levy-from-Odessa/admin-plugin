<template>
  <router-link 
      v-if="item.link"
      :to="item.link" 
      class="side-nav-link-ref" 
   >
   
      <i :class="`${item.icon}`" v-if="item.icon"></i>

      <span @click="$emit('updateNavBar')">
        {{ (item.label) }}
      </span>

      <span 
        :class="`badge rounded-pill bg-${item.badge.variant} float-end`"
         v-if="item.badge">
            {{ (item.badge.text) }}
      </span>


  </router-link>
</template>
<script>


export default {
  name: 'FtthSideNavLink',
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

  },
  methods: {
  }
}
</script>


<style lang="scss" module>
.Link{
  color: initial;
  background: initial;
}
</style>