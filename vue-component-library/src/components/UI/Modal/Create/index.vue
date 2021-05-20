<template>
    <b-modal 
        v-model="showModal" 
        title="Using Component Methods"
    >
        <b-container fluid>
            <slot name="content"/>
        </b-container>
        <template #modal-footer>
            <div class="w-100 d-flex justify-content-between">
                <b-button
                    variant="primary"
                    class="float-right"
                    @click="$emit('create')"
                >
                    Create
                </b-button>
                <b-button
                    class="float-right"
                    @click="showModal=false"
                >
                    Close
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default { 
    props: {
        show:{
            type:Boolean,
            default: () => false
        }
    },
    computed:{
        showModal:{
            get(){
                return this.show
            },
            set(){
                this.$emit('close')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>