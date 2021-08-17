<template>
    <div v-if="topTable.title || topTable.search || topTable.create">
        <div class="row justify-content-between algin-items-center pb-2 border-bottom">
            <div class="col-2">
                <h4 class="card-title">
                    {{topTable.title}}
                </h4>
            </div>

            <div class="col">
                <slot name="header"/>
            </div>

            <div class="col-3 ">
                 <b-button-group>
                    <slot 
                        name="button" 
                        :query="query"
                    />
                    <button
                        v-if="topTable.create"
                        class="btn btn-success "
                        @click="$emit('create')"
                    >
                        <i class="fas fa-plus "></i>
                    </button>
                    <b-button 
                        v-if="topTable.search"
                        @click="toggleShow('search')"
                        variant="primary"
                    >
                        <i :class="` fas fa-${show.search ? 'times' : 'search'}`"></i>
                    </b-button>
                    <b-button 
                        v-if="topTable.prop"
                        @click="toggleShow('prop')"
                    >
                        <i :class="` fas fa-cog`"></i>
                    </b-button>
                    <b-button 
                        v-if="topTable.toggleView"
                        @click="changeTemplate"
                        variant="outline-primary"
                    >
                        <i :class="`
                            fas
                            fa-${tableViewIcon()}`"/>
                    </b-button>
                </b-button-group>
            </div>
        </div>
        <transition name="search-item">
          <div class="search-item" v-if="show.search">
                <slot name="search" :query="query"/>
          </div>
        </transition>
        <transition name="search-item">
          <div class="search-item" v-if="show.prop">
                <slot name="propreties" :query="query"/>
          </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'FtthTableTitle',
    props: {
        topTable:{
            type: Object,
            default: () => ''
        },
        perPage: {
            type: Number,
            default: () => 10
        },
        filter: {
            type: String,
            default:() => ""
        },
        query: {
            type: Object,
            default:() => {}
        },
        tableViewTemplate: {
            type: String,
            default:() => 'grid'
        }
    },
    data() {
        return {
            show: {
                search: false,
                prop: false,
            }
        }
    },
    computed:{
        headerPerPage:{
            get(){
                return this.perPage
            },
            set(val){
                this.$emit('setPerPage', val)
            }
        },
        headerFilter:{
            get(){
                return this.filter
            },
            set(val){
                this.$emit('setFilter', val)
            }
        }
    },
    methods: {
        slotExist(name){
            return typeof this.$scopedSlots[name] !== 'undefined'
        },

        changeTemplate(){
            this.tableViewTemplate === 'grid'
                ? this.$emit('toggleTemplate', 'list')
                : this.$emit('toggleTemplate', 'grid')
        },

        tableViewIcon(){
            let icon = ''
            this.tableViewTemplate === 'grid'
                ? icon = 'list'
                : icon = 'table'
            return icon
        },


        toggleShow(flag){
            Object.keys(this.show).forEach(showKey => {
                if(showKey == flag){
                    this.show[flag] = !this.show[flag]
                }else {
                    this.show[showKey] = false
                }
            })
        }
    }
        
}
</script>

<style lang="scss" scoped>

.propreties{
    .btn{
        position: absolute;
        top: 10px;
        right: -40px;
    }
}
</style>
