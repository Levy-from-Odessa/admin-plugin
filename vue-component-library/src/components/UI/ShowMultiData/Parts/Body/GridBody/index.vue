<template>
    <b-table
      hover
      ref="table"
      class="
        table 
        project-list-table  
        table-centered 
        table-borderless 
        align-middle
        overflow-visible
      "
      responsive
      v-bind="rowBuilder"

      :items="itemProvider"
      
      :value="value"
      @input="$emit('input', $event)"
      @row-dblclicked="$emit('view', $event)"

      @filtered="$emit('filtered', $event)"
    >

        <template 
            v-for="header in rowBuilder.fields"
            #[gomycell(header)]="{item}" 
        >
            <slot
              :name="header.key"
              :item="item"
            />
        </template>



        <template #cell(actions)="row">
          <b-button-group>

              <TableActions 
                class="mx-3"
                :actions="actions" 


                @delete="$emit('delete', row.item)" 
                @view="$emit('view', row.item)"

                @toggleDetails="cusToggleDetails(row)"

              >
                <template #dropdown-action>
                  <slot 
                    name="dropdown-action"
                    :item="row.item"  
                  />
                </template>

              </TableActions> 

              <slot 
                name="actions"
                :item="row.item"  
              />

          </b-button-group>
        </template>

        <template #row-details="{item}">
            <slot 
              name="row-details" 
              :item="item"
            />
        </template>
    
    </b-table>
</template>

<script>
import TableActions from '../../Actions'
export default {
  name: 'GridBodyTable',
  components: {
    TableActions,
  },
  props:{
    rowBuilder:{
      type: Object,
      default: () => {},
      required: true
    },
    items:{
      type: Array,
      default: () => []
    },
    actions:{
      type: Object,
      default: () => {},
    },
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    
  },
  watch: {
    items() {
      this.$refs.table.refresh()
    }
  },
  methods:{
    cusToggleDetails(row) {
      this.currentItems.forEach(item => {
        this.$set(item, '_showDetails', false)
      })
      this.$nextTick(() => {
        row.toggleDetails()
      })
    },
    gomycell({key}) {
      return typeof this.$scopedSlots[key] !== 'undefined'
       && `cell(${key})`;
    },

    itemProvider (){
      return (this.items || [])
    }

  },
  
}
</script>

<style lang="scss" scoped>

</style>