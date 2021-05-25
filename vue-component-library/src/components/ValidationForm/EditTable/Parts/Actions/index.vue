<template>
  <div class="">
    <b-button
      v-if="!editMode && allowEdit && !directEdit"
      @click="$emit('open-mode')"
      variant="outline-light"
    >
       <i  class="mdi mdi-18px mdi-pencil "></i> 
    </b-button>
    <b-button
      v-if="editMode && !directEdit"
      @click="$emit('close-mode')"
      variant="outline-light"
    >
       <i  class="mdi mdi-18px mdi-check "></i> 
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'FtthValEditTableActions',
  props: {
    directEdit: {
      type: Boolean,
      required: true
    },
    allowEdit: {
      type: Boolean,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
