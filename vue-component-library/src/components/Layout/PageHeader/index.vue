<script>
export default {
  name: 'FtthPageHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <!-- start page title -->
  <div class="mb-2">
    <div class="row">
      <div class="col-6">
        <div class="page-title-box">
          <h4 class="mb-0 font-size-18">{{ title }}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <slot name="layout-title"/>
      </div>
    </div>

  </div>
  <!-- end page title -->
</template>
