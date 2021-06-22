export default {
	computed:{
		showMultiDataHeaders(){
			return this.$store.getters[`${this.store.name}/headers`] 
		},
    showHeaders(){
      return this.showMultiDataHeaders 
				&& this.showMultiDataHeaders.filter(header => header.show)
    },
	},
	methods: {
		initialHeaders(payload){
			this.$store.dispatch(`${this.store.name}/initializeHeaders`, 
				payload 
			)
		},
    changeHeaderVisible(payload) {
			if (!payload) {
				return
      }
			this.$store.dispatch(`${this.store.name}/changeHeaderVisible`, 
				payload 
			)

    },
    setMultiDataHeaders(){
			const allHeaders = []
      const exampleRow = this.dataTable[0]
			const actionHeader = {key: 'actions', label: 'actions', show: true}
			const defaultHeaders = {} 

			this.headers.forEach(header => {
				const label = this.$t(this.convertToSentenceCase(header.label))
				defaultHeaders[header.key] = {
					...header,
					label,
					show: true
				}
			})
      Object.keys(exampleRow).forEach(headerKey => {
					let flagShow = false

					if(headerKey.includes('@')) { return }

					const headerItem = {
						label: this.$t(this.convertToSentenceCase(headerKey)),
						key:  headerKey,
						show: flagShow
					}
					allHeaders.push(defaultHeaders[headerKey] || headerItem)
      })
			allHeaders.push(actionHeader)
			this.initialHeaders(allHeaders)
		},
		convertToSentenceCase(str){
			if (!str) {
				return
			}
			const result = str.replace(/([A-Z])/g,' $1');
			const final = result.charAt(0).toUpperCase()+result.slice(1);
			return final
		}
	},
	mounted(){
		this.setMultiDataHeaders()
	}
}