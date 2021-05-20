<template>
  <table
    class="table 
      project-list-table 
      table-nowrap 
      table-centered 
      align-middle"
  >
    <tbody>
      <tr 
        v-for="item in items" 
        :key="item.id"
        >
        <td class="">
          <slot
            name="list-item"
            :item="item"
            />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props:{
    items:{
      type: Array,
      default: () => []
    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>