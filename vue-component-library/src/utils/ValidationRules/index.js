import * as Validators from 'vuelidate/lib/validators'

export default  (schema) => {
  if (schema.soloForm) {
    let rules = {}
    const item = schema

    if (!('validations' in item)) { return rules }

    const validations = {}
    for (const rule in item.validations) {
      const params = item.validations[rule].params

      if (params) {
        validations[rule] = Validators[rule](params)
      } else {
        validations[rule] = Validators[rule]
      }
    }

    rules = validations
    return rules
  } else {
    return Object.keys(schema).reduce((rules, elementName) => {
      const item = schema[elementName]
      if (!('validations' in item)) { return rules }

      const validations = {}
      for (const rule in item.validations) {
        const params = item.validations[rule].params
        // validations[rule] = validationFn(rule, params)

        if (params) {
          validations[rule] = Validators[rule](params)
        } else {
          validations[rule] = Validators[rule]
        }
      }

      rules[elementName] = validations
      return rules
    }, {})
  }
}
