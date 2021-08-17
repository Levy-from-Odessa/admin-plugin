<template>
    <div class="row">
        <div class="col">
            <div
                class="dataTables_paginate paging_simple_numbers float-end"
            >
                <ul class="pagination pagination-rounded mb-0">
                    <b-pagination
                        v-model="pagCurrentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                    ></b-pagination>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TablePagination',
    props:{
        rows:{
            type: Number,
            default: 0,
        },
        perPage:{
            type: Number,
            default: 10
        },
        currentPage:{
            type: [Number, String],
            default: 1
        }
    },
    computed:{
        pagCurrentPage:{
            get(){
                return this.currentPage
            },
            set(val){
                this.$emit('setCurrentPage', val)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>