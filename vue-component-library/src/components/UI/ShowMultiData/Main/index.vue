
<template>
    <div class="card">
        <div class="card-body">
          <!-- Title -->
            <TableTitle 
                :topTable="{
                  ...topTable,
                  create: tableCreate,
                  toggleView: actions.toggleView,
                }"
                :tableViewTemplate="tableViewTemplate"
                :filter="filter" 
                :perPage="perPage"
                :query="query"
                @create="$emit('create')"
                @setPerPage="perPage = $event"
                @setFilter="filter = $event"
                @toggleTemplate="tableViewTemplate = $event"
            >
              <template #button>
                <slot
                  name="title-button"
                />
              </template>
              <template #search>
                <Search
                  @search="fetch"
                  :schema="searchSchema"
                  :query="query"
                />
                <slot
                  name="title-search"
                  :query="query"
                />
              </template>
              <template #propreties> 
                <Propreties 
                  :headers="allHeaders"
                  @change-header="changeHeaderVisible"
                />
              </template>

              <template #header>
                <slot name="title-header"/>
              </template>
            </TableTitle>


          <!-- Loader -->
            <TableLoader 
                :isMainLoading="isMainLoading"
                :dataTableLength="dataTable && dataTable.length"
                :headersLength="headers.length"
            />

          <template v-if="dataTable && dataTable.length !== 0">
            <!-- Grid Body -->
            <transition name="template-view">
              <TableGridBody 
                v-if="tableViewTemplate === 'grid'"
                v-model="currentItems"
                :items="filteredData"
                :rowBuilder="rowBuilder"
                :actions="{
                  delete: tableDelete,
                  view: tableView,
                  details: actions.details
                }"
                @filtered="onFiltered"
                @delete="setDeleteItem($event.id)" 
                @view="$emit('view', $event)"
              >
              <!-- Cols -->
                <template 
                    #[gomycell(header.key)]="{item}" 
                    v-for="header in headers"
                >
                    <slot
                      :name="header.key"
                      :item="item"
                    />
                </template>
              <!-- Actions col -->
                <template
                  v-if="slotExist('actions')"
                  #actions="{item}"
                >
                  <slot 
                    name="actions"
                    :item="item"  
                  />
                </template>

                <template 
                  v-if="slotExist('dropdown-action')"
                  #dropdown-action="{item}"
                >
                  <slot 
                    name="dropdown-action"
                    :item="item"  
                  />
                </template>
              </TableGridBody>
            </transition>


            <transition name="template-view">
              <TableListBody
                v-if="tableViewTemplate === 'list'"
                :items="filteredData"
              >
                <template #list-item="{item}">
                  <slot
                    name="list-item"
                    :item="item"
                  />
                </template>
              </TableListBody>
            </transition>

              <!-- Pagination -->
                <TablePagination 
                    v-if="actions.pagination"
                    :rows="totalItems" 
                    :perPage="perPage"
                    :current-page="currentPage"
                    @setCurrentPage="setCurrentPage"
                />
          </template>
        </div>
      <ModalDelete 
        @close="showDeleteModal = false" 
        @delete="onDeleteForm"
        :show="showDeleteModal" 
      />
    </div>
</template>



<script>

import permissions from '../permissions'
import getData from '../getData'
import headerBuilder from '../headerBuilder'
/* eslint-disable vue/no-unused-components */
import TableGridBody from '../Parts/Body/GridBody'
import TableListBody from '../Parts/Body/ListBody'
import TableTitle from '../Parts/Title'
import TablePagination from '../Parts/Pagination'
import TableActions from '../Parts/Actions'
import TableLoader from '../Parts/Loader'

// DELETE
import DeleteMixin from '@/mixins/Notifications/DeleteMixin'
import ModalDelete from '../..//Modal/Delete'

// Additional
import Search from '../Additional/Search'
import Propreties from '../Additional/Propreties'
/**
 * Advanced table component
 **/
export default {
  name: 'FtthShowMultiData',
  page: {
    title: "Advanced Table",
    meta: [
      {
        name: "description",
      },
    ],
  },
  
  mixins: [
    DeleteMixin,
    getData, 
    permissions, 
    headerBuilder
    // DeleteMixin
  ],

  components: {
      ModalDelete,
      TableGridBody,
      TableListBody,

      TableTitle,
      TablePagination,
      TableActions,
      TableLoader,

      Search,
      Propreties

      // ModalDelete,
  },
  data() {
    return {
      transProps: {
          // Transition name
          name: 'flip-list'
        },
      currentItems: [],
      totalRows: 1,
      perPage: 10,

      filter: '',

      showDelete: false,
      showDeleteModal: false,

      tableViewTemplate: '',

    };
  },
  mounted () {
    this.tableViewTemplate = this.viewTemplate
  },
  watch: {
    viewTemplate(template){
      this.tableViewTemplate = template
    }
  },
  methods:{
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    setCurrentPage (page) {
      this.fetch({ ...this.query, page})
    },
    gomycell(key) {
      return this.slotExist(key)
       && key
    },
    slotExist(name){
      return typeof this.$scopedSlots[name] !== 'undefined'
    },

  },

  computed: {
    rowBuilder(){
      return{
        fields: this.showHeaders,

        perPage: this.perPage,
        currentPage: this.currentPage,

        filter: this.filter,
        filterIncludedFields: this.filterIncludedFields,

        tbodyTransitionProps: this.transProps 
      }
    },

  }
  
};
</script>

<style lang="scss">
 @import './styles';
</style>