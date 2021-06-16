<template>
    <div class="row">
      <div class="col-12">
        <b-btn 
          variant="outline-warning"
          @click="editQuery = {}"
        >
          Clear
        </b-btn>
        <FtthSimpleForm 
          :schema="schema"
          v-model="editQuery"
          @changedItem="editQuery = $event"
        />

      </div>
    </div>
</template>

<script>

export default {
  name: 'FtthSearch',

  props: {
    query:{
      type: Object,
      default: () => {}
    },
		schema:{
			type: Object,
			default:() => {}
		}
  },

  computed:{
    editQuery:{
      get(){
        return this.query
      },
      set(value){
        console.log(value.allValues);
        this.$emit('search', value.allValues)
      }
    }
  }
  
}
</script>


<style lang="scss" module>
.Search{
  color: initial;
  background: initial;
}
</style>