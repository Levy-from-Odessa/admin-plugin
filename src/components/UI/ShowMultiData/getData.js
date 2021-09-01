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


    strongHeaders: {
      type: Boolean,
      default: false
    },
   
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
    },
    inputQuery:{
      type: Object,
      default: () => {}
    },
    stream:{
      type: Boolean,
      default: () => false
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


            query: {},
            order: {},

            streamFetchData: null
        }
    },
    methods: {
      fetch (query = {}) {
        if (this.copyStore.actions) {
          const { actions: { fetchData, propsData } } = this.copyStore

          console.log(query);
          
          const payload = { 
            ...this.routeQuery, // from url
            ...this.query, // local
            ...propsData, // initial filters
            ...this.order, // asc/desc for each
            page: 1,
            ...query, // input
          } 
          
          
          this.query = payload
          
          // this.putUrlQuery(this.query)
          
          
          this.$store.dispatch(`${this.store.name}/${fetchData}`, {
            ...payload,
            ...this.inputQuery // new filters from parent, no need to save in table
          })
        }
      },
      onHeaderClicked(orderName) {
        // toggle order
        const direction = this.order[`order[${orderName}]`] === 'ASC'
          ? 'DESC'
          : 'ASC';

          
          this.order = { 
            [`order[${orderName}]`]: direction 
          };
          
          // leave only one order
          Object.keys(this.query).forEach((queryItem) => {
            if (queryItem.includes('order') && queryItem !== orderName) {
              delete this.query[queryItem];
            }
          });
          
          this.fetch();

        },
      putUrlQuery(payload){
        const query = payload 
        const path = this.$route.path
        this.$router.replace({path, query}).catch(()=>{})
      }
    },
    mounted () {
      if (this.readyItems) {
        this.dataTable =  this.readyItems
        this.filteredData = this.readyItems
      } else{
        if (this.stream) {
          this.fetch()
          this.streamFetchData = setInterval(() => {
            this.fetch() 
          }, 6000);
        } else {
          this.fetch()
        }
      }
    },
    beforeDestroy () {
      console.log('undefined');
      clearInterval(this.streamFetchData)
    },
    watch: {
      dataGetter(getter){
        if (getter) {
          this.dataTable =  getter
          this.filteredData = getter
        }
      },
      dataTable(){
        // this.$refs.gridBody.refresh()
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
      },
      inputQuery(){
        this.fetch()
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
        // currentPage(){
        //   return this.$store.getters[`${this.store.name}/pageNumber`] 
        // },
        isMainLoading(){
          return this.$store.getters[`${this.store.name}/isMainLoading`]
        },
        deleted(){
          return this.$store.getters[`${this.store.name}/deleted`]
        },
        routeQuery(){
          return this.$route.query
        }

    },
}