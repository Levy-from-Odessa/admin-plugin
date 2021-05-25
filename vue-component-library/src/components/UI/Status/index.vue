<template>
  <div 
    class="card mini-stats-wid Status" 
    @mouseleave="$emit('mouseleave')"
    @mouseenter="$emit('mouseenter')"
    >
    <div class="card-body ">
      <div class="media">
        <div :class="`
          mini-stat-icon 
          avatar-sm 
          align-self-center 
          rounded-circle 
          mx-2
          ` 
          ">
          <span :class="`avatar-title bg-${color} `" >
            <i :class="`${icon} font-size-24`"></i>
          </span>
        </div>
        <div class="media-body">
          <p class=" fw-medium mb-2">{{title}}</p>
          <h4 class="mb-0">{{value}}<small> {{unit}}</small></h4>
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
  name: 'FtthStatus',
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: () => "primary"
    },
    unit: {
      type: String,
      default: () => ""
    }
  }
};
</script>


<style lang="scss" scoped>
.Status{
  text-align: center;
    .media{
      flex-wrap: wrap !important;
      .avatar-sm{
        margin: 0 auto !important;
      }
    }
}


@media only screen and (max-width: 1500px) {
  .Status{
    width: 230px !important;
    // height: 140px;
  }
}
@media only screen and (max-width: 1200px) {
  .Status{
    // width: auto !important;
    // height: auto;
  }
}
</style>