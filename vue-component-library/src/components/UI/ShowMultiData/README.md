# FtthShowMultiData

Table to show data from server or received data

| Prop           |     Type     |         Default |
| -------------- | :----------: | --------------: |
| store          |    Store     |              {} |
| headers        |   Header[]   |  defaultHeaders |
| topTable       |    Object    | defaultTopTable |
| actions        |    Object    |  defaultActions |
| viewTemplate   | ViewTemplate |          'grid' |
| readyItems     |    Array     |            null |
| noPermissions  |   Boolean    |           false |
| permissionName |    String    |              '' |
| searchSchema   |    Object    |              {} |

## Interfaces

```javascript
interface Store {
	name: string,
	actions: {
		fetchData: string,
		getData: string,
		propsData: string
	}
}
interface Header{
	label: string,
	key: string
}
enum ViewTemplate{
	grid,
	list
}
```

## Arguments

```javascript
defaultHeaders = [
  {
    label: "Field",
    key: "name",
  },
  {
    label: "Value",
    key: "value",
  },
  {
    label: "Action",
    key: "action",
  },
];

defaultTopTable = {
  title: "",
  create: false,
  search: false,
};
defaultActions = {
  view: false,
  delete: false,
  details: false,
  pagination: true,
};
```

---

### Table Data

if the table didnt received prop "readyItems" it will fetch data from store.

Fetch function get - query(filters) which it save in data and in url of the page. The function make dispatch request to store by - store name, fetchData name and query.

```javascript
	/*
		@params query: Object
	*/
fetch (query = {}) {
	if (this.copyStore.actions) {
		const {
			actions: {
				fetchData,
				propsData
			}
		} = this.copyStore //dispatch data


		const payload = {
			...this.routeQuery, // filters from url
			...query, // new filter
			...propsData // filters from parent component
		}
		this.query = payload


		// func to save query in page url
		// example: .../?itemId=12&..
		this.putUrlQuery(propsData)


		// dispatch function to store
		//  example: this.$store.dispatch(
		// 		'moduleName/allIds',
		//  	{itemId: 12}
		// )
		this.$store.dispatch(`${this.store.name}/${fetchData}`,
			payload)
		}
},
```

Getter which waiting for data from store. They only need to now module name and field name

```javascript
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
currentPage(){
	return this.$store.getters[`${this.store.name}/pageNumber`]
},
isMainLoading(){
	return this.$store.getters[`${this.store.name}/isMainLoading`]
},
```

---

# Table headers

This components allows to edit columns which you want to see or hide, for that feature the component go trough the data that it received from store or from parent component. All headers that was received from parent component become visible with additional field "show" (show: true), all else items are hide by the field "show" (show: false)

```javascript
dataTable(dataTable){
	const isExistAllHeaders = this.allHeaders.length > 0

	if (dataTable && !isExistAllHeaders) {
			const allHeaders = [] // new array of headers

			// get first object to use all fields that it use
			const exampleRow = dataTable[0]

			// action columns almost always needed
			const actionHeader = {
					key: 'actions',
					label: 'actions',
					show: true
			}

			const defaultHeaders = {}
			// first step save all received headers
			if (exampleRow) {
				this.headers.forEach(header => {
					// create readable label
					const label = this.$t(
						this.convertToSentenceCase(header.label)
					)
					defaultHeaders[header.key] = {
						...header,
						label,
						show: true
					}
				})

				// second step go through all fields and to hide if there arent in the array already
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

```
