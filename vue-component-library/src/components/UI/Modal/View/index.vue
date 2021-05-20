<template>
  <div class="card">
      <div class="card-body">
        <div class="row d-flex justify-content-between algin-items-center">
          <div class="col" v-if="title">
            <h4 class="card-title mb-4">{{title}}</h4>
          </div>
          <div class="col">
            <slot name="header"/>
          </div>

        </div>

        <div class="table-responsive ">
          <table class="table table-nowrap mb-0">
            <tbody>
              <tr v-for="(val, key) in items" :key="key">
                <th scope="row">{{key}} :</th>
                
                <td v-if="slotExist(key)">
                  <slot :name="key" :item="val" />
                </td>
                <td v-else>
                  {{ val }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>


export default {
  name: 'uiModalView',
  props:{
    title: {
      type: String,
      default: ''
    },
    items:{
      type: Object,
      default: () => {}
    }
  },

  data(){
    return{

    }
  },

  computed:{
    hasValueSlot(){
      return Object.keys(this.items).reduce((obj, key )=>{
        return {...obj, [key]:!!this.$slots[this.items[key]]}
      }, {})
      
    }

  },

  mounted(){

  },
  methods: {
    slotExist(name){
      return typeof this.$scopedSlots[name] !== 'undefined'
    }

  }
}
</script>


<style lang="scss" module>
.View{
  color: initial;
  background: initial;
}
</style>