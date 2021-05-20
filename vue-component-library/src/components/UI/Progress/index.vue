<template>
  <div class="card mini-stats-wid">
    <div class="card-body ">
      <div :class="`row  d-flex justify-content-between progress-${color}`">
        <div class="col">
          <h4 class=" fw-medium mb-2">{{title}} Utilization</h4>
          <p class="text-muted mb-0">{{subtitle}}</p>
        </div>
        <div class="col-4">
          <h4 
            :class="`fw-bold text-${color}`"
            
          >
            {{value.data[0]}}  {{unit}}
          </h4>
          <!-- <p class="text-muted ">
            {{value.total}}  {{unit}}
          </p>TOTAL -->
        </div>

        <div class="row mt-4">
          <b-progress  
              striped 
              animated 
              :max="value.total" 
            >
                <b-progress-bar 
                  :value="value.data[0]"
                  :variant="color"
                >
                </b-progress-bar>
          </b-progress>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
/**
 * Stat component -- specify the widget icon, title and value.
 */
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number, Object],
      default: ""
    },
    unit: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: () => "primary"
    },
    computed:{
      total(){
        console.log(this.value);
        return this.value.total
      },

    }
  }
};
</script>




<style lang="scss" scoped>
.Progress{
  color: initial;
  background: initial;
}
.progress-red{

}
</style>