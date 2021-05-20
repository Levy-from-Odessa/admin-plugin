
<template>
    <b-modal 
        v-model="showModal" 
    >
        <template #modal-header>
            <div class="col" v-if="title">
                <h4 class="card-title mb-4">{{title}}</h4>
            </div>
            <div class="col">
                <slot name="header"/>
            </div>

        </template>
        <b-container fluid>

            <div class="">
                <slot name="content"/>
            </div>

        </b-container>
    </b-modal >
</template>

<script>


export default {
    name: 'uiModalInfo',
    props:{
        title: {
            type: String,
            default: ''
        },
        show:{
            type:Boolean,
            default: () => false
        }
    },

    data(){
        return{

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
    },


    mounted(){

    },
}
</script>


<style lang="scss" module>
.Info{
  color: initial;
  background: initial;
}
</style>