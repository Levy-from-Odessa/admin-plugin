export default {
  name: 'SchemaMixin',
  methods: {
    schemaGenerator (
      allItems,
      component, 
      options = [],
      type
     ) {
      const res = {}
      if (Array.isArray(allItems)) {
        allItems.forEach((item) => {
          if (!this.schemas[`${item.name}Schema`]) {
            res[`${item.name}Schema`] = {
              soloForm: item.name,
              component,
              type: type || item.fieldType || 'text',
              options,
              validations: {
                required: {
                  params: null,
                  message: this.$t('Validate required')
                }
              }

            }
          }
        })
      } else {
        Object.keys(allItems).forEach((item) => {
          if (!this.schemas[`${item}Schema`]) {
            res[`${item}Schema`] = {
              soloForm: item,
              component,
              options,
              type: type || item.fieldType || 'text',
              showLabel: 'label',
              showValue: 'value',
              validations: {
                required: {
                  params: null,
                  message: this.$t('Validate required')
                }
              }

            }
          }
        })
        
      }
      return res
    }
  }
}
