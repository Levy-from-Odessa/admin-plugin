<template>
  <div class="card p-3">
    <h2 class="card-title border-bottom pb-3">  
      {{title}}
    </h2>
    <div class="py-2" 
      v-for="(count, name, index) in topUsage.data" 
      :key="name"
      >
        <h6>{{name}}</h6>
        <b-progress
          show-progress
          height="20px"
          :max="topUsage.max"
          >
              <b-progress-bar 
                :value="count"
                :variant="colors[Math.floor(index%5)]"
              >
                <span class="font-size-12 font-weight-bold">
                  {{count}}
                </span>
              </b-progress-bar>
        </b-progress>

      </div>
  </div>
</template>

<script>
export default {
  props: {
    title:{
      type: String,
      default: () => ''
    },
    topUsage: {
      type: Object,
      default: () => {}
    }
  },
    
  data(){
    return{
      colors: ['info', 'success', 'danger', 'warning', 'primary'],
    }
  },
}
</script>

<style lang="scss" scoped>

</style>