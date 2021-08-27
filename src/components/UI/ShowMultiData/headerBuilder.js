import {setLocalStorage , getLocalStorage} from '../../../utils/localStorage';
import toSentenceCase from '../../../utils/toSentenceCase';
export default {
	data() {
		return {
			allHeaders: [], 
			defaultHeaders: [],
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
		setDefaultHeaders(){
			const localStorageHeaders = getLocalStorage(this.routeName + this.store.name) 

			const savedHeaders = localStorageHeaders  


			const defaultHeaders = this.headers.map(header => {
				const label = this.$t(toSentenceCase(header.label))
				return { 
					...header,
						label,
						show: true
					}
			})

			// dont fetch and dont save headers from local storage 
			if (this.strongHeaders) {
				return defaultHeaders
			}
			
			// save input or saved headers in visible form
			const isSavedHeaders = savedHeaders.length > 0 
			this.defaultHeaders = isSavedHeaders 
				? savedHeaders 
				: defaultHeaders
		}
	},
	
	computed: {
    showHeaders(){
      return this.allHeaders 
				&& this.allHeaders.filter(header => header.show)
    },
		routeName(){
			return this.$route.name
		}
	},
	
	watch:{
		dataTable(dataTable){
			if (dataTable && dataTable.length > 0) {
					this.allHeaders = []
					const allHeaders = []

					const exampleRow = dataTable[0]
					this.setDefaultHeaders()

					if (exampleRow) {
						// build defaults
						// disable action header to set it after headers will be built
						const defaults = Object.assign([], this.defaultHeaders)
						const actionHeaderIndex = this.defaultHeaders.findIndex(el => el.key === 'actions')
						if (actionHeaderIndex !==  -1) {
							defaults.splice(actionHeaderIndex, 1)
						}

						allHeaders.push(...defaults)


						// get columns from first obj from DB
						Object.keys(exampleRow).forEach(headerKey => {

								if(headerKey.includes('@')) { return }

								const headerItem = {
									label: this.$t(toSentenceCase(headerKey)),
									key:  headerKey,
									show: false
								}

								// save or default header (that was put in parent) or other (from BD)
								// add to stack hidden cols
								const isDefaultHeaderItem = this.defaultHeaders.find(headerItem => 
									headerItem.key === headerKey
								)

								if (!isDefaultHeaderItem) {
									allHeaders.push(headerItem)
								}
						})

					}
					this.allHeaders = allHeaders
			}
		},
		showHeaders(headers) {
			// dont fetch and dont save headers from local storage 
			if (!this.strongHeaders && headers.length > 0) {
				setLocalStorage(this.routeName + this.store.name,  headers);
			}
		},
		allHeaders (allHeaders) {
			if (allHeaders.length === 0) {
				return;
			}
			// condition fot adding action column
			const isExistActionHeader = allHeaders.find(headerItem => headerItem.key === 'actions')
			if (isExistActionHeader) {
				return;
			}

			//if user have perm for action col
			const actionPerm = this.tableActionColumn || this.actions.details

			const actionHeader = { 
							key: "actions", 
							label: this.$t("Actions"), 
							show: true
						}

			if (actionPerm) {
				this.allHeaders.push(actionHeader)
			}
		}
	},

}