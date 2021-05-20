export default {
  methods: {
    // make array [{key: *'key'*, value: *'value'*}]
    // to obj {*'key'*: *'value'*}
    convertArrayToObject (array, key = 'name', value = 'value') {
      const initialValue = {}
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item[value]
        }
      }
      , initialValue)
    }

  }

}
