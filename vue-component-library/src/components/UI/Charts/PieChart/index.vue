<template>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4 pb-3 border-bottom">{{title.toUpperCase()}}</h4>
        
        <apexchart
          class="apex-charts"
          height="320"
          type="pie"
          dir="ltr"
          :series="pieChart.series"
          :options="pieChart.chartOptions"
        />
      </div>
    </div>
</template>

<script>
export default {
  name: 'FtthPieChart',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    data:{
      type: Array,
      default: () => []
    },
    labels:{
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },

  computed: {
      pieChart () {
        return {
          series: this.data,
          chartOptions: {
              labels: this.labels,
              colors: ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"],
              legend: {
                  show: true,
                  position: 'bottom',
                  horizontalAlign: 'center',
                  verticalAlign: 'middle',
                  floating: false,
                  fontSize: '14px',
                  offsetX: 0
              },
              responsive: [{
                  breakpoint: 600,
                  options: {
                      chart: {
                          height: 240
                      },
                      legend: {
                          show: false
                      },
                  }
              }]
          }
        }
    }
  },

}
</script>


<style lang="scss" module>
.PieChart{
  color: initial;
  background: initial;
}
</style>