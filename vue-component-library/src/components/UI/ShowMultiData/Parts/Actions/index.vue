<template>
  <div class="">
    <b-dropdown
      v-if="actions.view || actions.delete || actions.toggleView "
      class="card-drop"
      variant="black"
      menu-class="dropdown-menu-end"
      right
      
      toggle-class="p-0"
    >
      <template v-slot:button-content>
        <i class="mdi mdi-dots-horizontal font-size-18"></i>
      </template>
      
      <b-dropdown-item 
        class="d-block"
        v-if="actions.view"
        @click="$emit('view')" 
        
      >
        <a class="dropdown-item ">
          <i class="bx bx-show-alt font-size-16 align-middle me-1"></i>
          View 
        </a>
       </b-dropdown-item
      >
      <b-dropdown-item 
        v-if="actions.delete"
        class="text-danger" 
        @click="$emit('delete')" 
        variant="red"
      >
        <a class="dropdown-item text-danger">
          <i class="bx bx-trash font-size-16 align-middle me-1"></i>
            Delete
        </a>
       </b-dropdown-item>



        <slot 
          name="dropdown-action"
        />
    </b-dropdown>
    


    <!-- toggle details -->
    <!-- <TableActionMoreInfo 
      v-if="actions.details"
      :row="row"
      @toggle="$emit('toggleDetails', $event)"
    /> -->


  </div>
</template>

<script>


export default {
  name: 'uiTableActions',
  props: {
    actions:{
      type: Object,
      default:() => {}
    },
    row:{
      type: Object,
      default:() => {}
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
.Actions{
  color: initial;
  background: initial;
}
</style>