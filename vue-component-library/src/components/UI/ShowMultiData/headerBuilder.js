import {setLocalStorage , getLocalStorage} from '../../../utils/localStorage';
export default {
	data() {
		return {
			allHeaders: []
		}
	},

	methods: {
    changeHeaderVisible(payload) {
			if (!payload) {return }

			const newHeaders = Object.assign([], this.allHeaders) 
			payload.forEach((header ) => {
				const index = newHeaders.findIndex(item => item.key === header.key)
				newHeaders[index].show = !newHeaders[index].show
			})

			this.allHeaders = newHeaders
    },

		convertToSentenceCase(str){
			if (!str) {return}

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

					if (exampleRow) {
						const savedHeaders = getLocalStorage(this.store.name)
						
						// save input or saved headers in visible forma
						const defaultHeaders = savedHeaders || this.headers.map(header => {
							const label = this.$t(this.convertToSentenceCase(header.label))
							return { 
								...header,
									label,
									show: true
								}
						})

						// get columns from first obj from DB
						Object.keys(exampleRow).forEach(headerKey => {

								if(headerKey.includes('@')) { return }

								const headerItem = {
									label: this.$t(this.convertToSentenceCase(headerKey)),
									key:  headerKey,
									show: false
								}

								// save or default header (that was put in parent) or other (from BD)
								const defaultHeaderItem = defaultHeaders.find(headerItem => headerItem.key === headerKey)
								allHeaders.push(defaultHeaderItem || headerItem)
						})

						// condition fot adding action column
						const actionPerm = this.tableView || this.tableDelete || this.tableCreate
						const actionHeader = defaultHeaders.find(headerItem => headerItem.key === 'actions')
						if (actionHeader && actionPerm) {
							allHeaders.push(actionHeader)
						}

						this.allHeaders = allHeaders
					}
			}
		},
		showHeaders(headers) {
			setLocalStorage(this.store.name,  headers);
		}
	}
}