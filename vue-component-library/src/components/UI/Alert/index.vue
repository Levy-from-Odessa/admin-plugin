<template>
  <div class="Alert">
    <template
      v-for="alert in alerts"
    >
      <b-alert
        :key="alert.id"
        :show="dismissSecs"
        dismissible
        :class="'alert-' + alert.type"
        @dismiss-count-down="countDownChanged"
        @dismissed="deleteAlert(alert.id)"
      >
      <div class="row">
        <div class="col-2 text-algin-center">
          <i class="fas fa-check fa-2x p-2" v-if="alert.type==='success'"></i>
          <i class="fas fa-times fa-2x p-2" v-if="alert.type==='danger'"></i>
        </div>
        <div class="col">
          <span :class="` font-weight-bold`" >{{alert.type}}:</span>
          <span>
            {{alert.message}}
          </span>
        </div>

      </div>

      </b-alert>

    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'FtthAlert',

  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0
    }
  },
  computed:{
    ...mapGetters('notification', ['alerts'])
  },
  methods: {
    ...mapActions('notification', ['deleteAlert']),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
  }

}
</script>


<style lang="scss" scoped>
.Alert{
  top: 30px;
  right: 30px;
  width: 350px;
  position: absolute !important;
  z-index: 1043;
  font-size: 16px;
  .alert{
    padding: 20px;
  }
}
</style>