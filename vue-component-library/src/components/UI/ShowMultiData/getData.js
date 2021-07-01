export default {
  props: {
    store: {
      type: Object,
      default: () => ({})
    },
    /*
    {name: str, actions: {
        fetchData: str, 
        getData: str, 
        propsData: any
      }
     }
     */
    headers: {
      type: Array,
      default: () => [
        {
          label: 'Field',
          key: 'name'
        },
        {
          label: 'Value',
          key: 'value'
        },
        {
          label: 'Action',
          key: 'action'
        }
      ]
    },
    defaultHeaders:{
      type: Array,
      default: () => []
    },
    /*
    [...{text: str, value: str}]
     */
    // sortBy: {
    //   type: Array,
    //   default: () => []
    // },
    /*
      [...str]
     */
    topTable: {
      type: Object,
      default: () => ({
        title: '',
        create: false,
        search: false
      })
    },
    actions: {
      type: Object,
      default: () => ({
        view: false,
        delete: false,
        details: false,
        pagination: true
      })
    },
    viewTemplate: {
      type: String,
      default: () => 'grid'
    },
    readyItems: {
      type: Array,
      default: () => null
    },
    noPermissions: {
      type: Boolean,
      default: () => false
    },
    permissionName: {
      type: String,
      default: () => ''
    },
    searchSchema:{
      type: Object,
      default: () => {}
    }
  },
    data() {
        return {
            defaultStoreActions: {
                fetchData: 'fetchAll',
                getData: 'allIdsData',
                getTotalItems: 'allIdsTotalItems',
                getHeaders: 'allIdsHeaders',
            },

            dataTable: [],
            filteredData: [], // copy of dataTable, but can be filtered 


            query: {}
        }
    },
    methods: {
      fetch (query = {}) {
        if (this.copyStore.actions) {
          const { actions: { fetchData, propsData } } = this.copyStore
          const payload = { ...this.routeQuery, ...query, ...propsData } 
          
          this.query = payload
          
          
          
          this.putUrlQuery(payload)
          
          console.log(payload);
          console.log(`${this.store.name}/${fetchData}(${payload})`);
          
          this.$store.dispatch(`${this.store.name}/${fetchData}`, 
            payload 
          )
          }
      },
      putUrlQuery(payload){
        const query = payload 
        const name = this.$route.name
        this.$router.replace({ name ,query }).catch(()=>{})
      }
    },
    mounted () {
      if (this.readyItems) {
        this.dataTable =  this.readyItems
        this.filteredData = this.readyItems
      } else{
        this.fetch()
      }
    },
    watch: {
      dataGetter(getter){
        if (getter) {
          this.dataTable =  getter
          this.filteredData = getter
        }
      },
      dataTable(){
        this.$refs.table && this.$refs.table.refresh()
      },
      filter(filter){
        const filteredData = this.dataTable.filter(data => {
          let foundFilter = false
          Object.keys(data).forEach(key => {
            if(typeof data[key] === 'string'){
              const word = data[key].trim().toLowerCase()
              const clearFilter = filter.trim().toLowerCase()
              if(word.includes(clearFilter)) {
                foundFilter = true
              }
            }
          })
          return foundFilter
        })
        this.filteredData = filteredData
      }
    },
    computed: {
        copyStore () {
            return Object.assign({},  {...this.store, actions: { 
              ...this.defaultStoreActions,
              ...this.store.actions
            }})
        },
        dataGetter(){
          if (this.readyItems) {
            return this.readyItems
          }
          const { actions: { getData } } = this.copyStore
          return this.$store.getters[`${this.store.name}/${getData}`] 
        },
        totalItems(){
          const { actions: { getTotalItems } } = this.copyStore
          return this.$store.getters[`${this.store.name}/${getTotalItems}`] 
        },
        // allHeaders(){
        //   const { actions: { getHeaders } } = this.copyStore
        //   return this.$store.getters[`${this.store.name}/${getHeaders}`] 
        // },
        currentPage(){
          return this.$store.getters[`${this.store.name}/pageNumber`] 
        },
        isMainLoading(){
          return this.$store.getters[`${this.store.name}/isMainLoading`]
        },
        routeQuery(){
          return this.$route.query
        }

    },
}