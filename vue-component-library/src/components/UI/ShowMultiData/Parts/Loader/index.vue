<template>
  <div class="">
    <div class="" v-if="isMainLoading">

        <b-progress class="w-100" :max="maxLoadingTime" height=".8rem">
          <b-progress-bar 
              animated
              striped
              :value="loadingTime" 
          />
        </b-progress>
        <template v-if="dataTableLength===0">
          <b-skeleton-table
            :rows="10"
            :columns="headersLength"
            :table-props="{  striped: true, }"
          ></b-skeleton-table>
        </template>
    </div>
    <div v-if="!isMainLoading && dataTableLength===0">
      <h1>no data</h1> 
    </div>
  </div>
</template>

<script>


export default {
  name: 'uiGridsTableLoader',
  props: {
    isMainLoading:{
      type: Boolean,
      default: false
    },
    dataTableLength:{
      type: Number,
      default: 0
    },
    headersLength:{
      type: Number,
      default: 0
    }
  },

  data(){
    return{
      loadingTime: 0,
      maxLoadingTime: 3,
      loading: false 

    }
  },

  created() {
    this.$_loadingTimeInterval = null
  },
  

  methods: {
    clearLoadingTimeInterval() {
      this.loadingTime = 0
      clearInterval(this.$_loadingTimeInterval)
      this.$_loadingTimeInterval = null
    }
  },
  watch: {
    isMainLoading(loading){
      this.loading = loading
    },
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval()

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime += 0.5
          }, 50)
        }
      }
    },
  },
}
</script>


<style lang="scss" module>
.Loader{
  color: initial;
  background: initial;
}
</style>