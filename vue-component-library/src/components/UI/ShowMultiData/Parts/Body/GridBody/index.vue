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
            <!-- #[gomycell(header)]="{item}"  -->
          <!-- <slot
            :name="header.key"
            :item="item"
          /> -->

        <template 
            v-for="header in rowBuilder.fields"
            #[gomyhead(header)] 
        >
          <TableHeaderItem
            :key="header.key"
            :header="header"
            :query="order"

            @setOrder="$emit('onHeaderClicked', $event)"
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
import TableHeaderItem from './HeaderItem'
export default {
  name: 'GridBodyTable',
  components: {
    TableActions,
    TableHeaderItem
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
    order: {
      type: Object,
      default: () => {},
    }
    
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
    gomyhead({ key }) {
      return `head(${key})`;
    },

    itemProvider (){
      return (this.items || [])
    },
    refresh(){
			this.$refs.table.refresh()
    }

  },
  
}
</script>

<style lang="scss" scoped>

</style>