<template>
    <li 
        class="menu-title font-size-16 " 
    >
        {{ (item.label) }}
    </li>
</template>

<script>
export default {
    name: 'FtthSideNavTitle',

    props: {
        item: {
            type: Object,
            default: () => {}
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>