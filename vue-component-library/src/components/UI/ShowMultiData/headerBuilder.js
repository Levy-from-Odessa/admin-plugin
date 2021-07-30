export default {
	data() {
		return {
			allHeaders: []
		}
	},

	methods: {
    changeHeaderVisible(payload) {
			if (!payload) {
				return
      }

			const newHeaders = Object.assign([], this.allHeaders) 
			payload.forEach((header ) => {
				const index = newHeaders.findIndex(item => item.key === header.key)
				newHeaders[index].show = !newHeaders[index].show
			})

			this.allHeaders = newHeaders
			// this.$refs.gridBody.refresh()

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
	
	computed: {
    showHeaders(){
      return this.allHeaders 
				&& this.allHeaders.filter(header => header.show)
    },
	},
	
	watch:{
		dataTable(dataTable){
			const isExistAllHeaders = this.allHeaders.length > 0
			if (dataTable && !isExistAllHeaders) {
					const allHeaders = []
					const exampleRow = dataTable[0]
					const actionHeader = {key: 'actions', label: 'actions', show: true}
					const defaultHeaders = {} 
					if (exampleRow) {
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
						this.allHeaders = allHeaders
					}
			}
		}
	}
}