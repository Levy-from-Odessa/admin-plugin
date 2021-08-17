<template>
    <b-thead>
        <b-tr>
            <b-th
                v-for="(header, indexHeader) in headers"
                :key="header.label +indexHeader"
                style="max-width: 35%"
            >
                {{ $t(header.label) }}
            </b-th>
            <th />
        </b-tr>
    </b-thead>
</template>

<script>
export default {
  name: 'FtthValEditTableHeaders',
    props: {
        headers: {
            type: Array,
            required: true
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>