<template>
    <div v-if="topTable.title || topTable.search || topTable.create">
        <div class="row justify-content-between algin-center pb-2 border-bottom">
            <div class="col">
                <h4 class="card-title">{{topTable.title}}</h4>
            </div>


            <div class="col-2">
                <slot name="header"/>
            </div>

            <div class="col-2 ">
                  <button
                      v-if="topTable.create"
                      class="btn btn-success "
                      @click="$emit('create')"
                  >
                      <i class="fas fa-plus font-size-16"></i>
                  </button>
                  <template  v-if="topTable.search">
                      <b-button 
                          @click="showSearch = !showSearch"
                          class="m-1"
                          variant="primary"
                      >
                        <i :class="`font-size-16 fas fa-${showSearch ? 'times' : 'search'}`"></i>
                      </b-button>
                  </template>
                  <template  v-if="topTable.toggleView">
                      <b-button 
                          @click="changeTemplate"
                          class="m-1"
                          variant="outline-primary"
                      >
                        <i :class="`font-size-16
                         fas
                         fa-${tableViewIcon()}`"/>
                      </b-button>
                  </template>
            </div>
        </div>
        <transition name="search-item">
          <div class="search-item" v-if="showSearch">
                <slot name="search" :query="query"/>

                <!-- <b-form-group
                    v-if="slotExist('search')"
                    label-cols-lg="4"
                    label="Search"
                >
                    <b-form-input
                        v-model="headerFilter"
                    />
                </b-form-group> -->
          </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'TableTitle',
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
            showSearch: false,
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
        }
    }
        
}
</script>

<style lang="scss" scoped>

</style>
