export default {
    methods:{
        setFields(item){
            if (!Array.isArray(item)) {
                const res = []
                const editItem = Object.assign({}, item)
                for (const key in editItem) {
                    const itemProp = {
                        name: key,
                        value: editItem[key],
                        show: true,
                        allowEdit: true,
                        allowDelete: false,
                        editMode: false,
                        table: false,
                        directEdit: false
                    }
                    res.push(itemProp)
                }
                return res
            } else {
                return JSON.parse(JSON.stringify(item))
            }

        },
        setSelectSchema(schemaName, itemProp) {
            let value = itemProp.value
            let directEdit = false
            if (schemaName === 'BaseSelect') {
                directEdit = true
                if (Array.isArray(itemProp.value) && itemProp.value.length > 0) {
                    value = itemProp.value.map(objVal => (
                        objVal[itemProp.schema.showValue]
                    ))
                }
            } 
            return {
                value,
                directEdit
            }

        },
        toEditItemsProp (
            item,
            ignoreArray = [''],
            readonlyArray = [''],
            tableArray = [''],
            deleteArray = ['']
        )
        {
            const editItemsProp = []
            let arrayOfValues = this.setFields(item)
            
            ignoreArray.push('@context', '@id', '@type')
            readonlyArray.push('id')

            arrayOfValues.forEach((itemProp) => {
                const { name } = itemProp

                // ignore
                itemProp.show = !ignoreArray.includes(name)

                // readonly
                itemProp.allowEdit = !readonlyArray.includes(name)

                // delete
                itemProp.allowDelete = deleteArray.includes(name)

                // table
                const headers = {
                    headers: this[`${name}Headers`]
                }

                itemProp.table = tableArray.includes(name)
                    ? headers
                    : false

                // schema
                if (itemProp.allowEdit && itemProp.show) {
                    itemProp.schema = this.editSchemas[`${name}Schema`]
                    itemProp.directEdit = false
                }

                // select schema
                if (itemProp.schema) {
                    const schemaName = itemProp.schema.component
                    const {value, directEdit} = this.setSelectSchema(schemaName, itemProp)

                    itemProp.value = value
                    itemProp.directEdit = directEdit
                }

                // show
                if (itemProp.show) {
                    itemProp.editMode = false
                    editItemsProp.push(itemProp)
                }


                // !UPDATE PERMISSIONS
                // last check fot permission upadate
                // if (!this.isAllowEdit) {
                //     itemProp.allowEdit = false
                //     itemProp.allowDelete = false
                    // itemProp.directEdit = true
                // }
            })
            
            return editItemsProp
        }
    }

}