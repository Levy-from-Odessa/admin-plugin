import components from './components'

import mixins from './mixins'

import utils from './utils'



const ComponentLibrary = {
  install(Vue, options = {}) {
    console.log(options);
    // components
    for (const componentName in components) {
      const component = components[componentName]

      if (component.name === undefined) {
        console.log(`${component.__file} doesnt have name, pls set COMPONENT name and try again `);
      }
      Vue.component(component.name, component)
    }


    // mixins
    for (const mixinName in mixins) {
      const mixin = mixins[mixinName]

      if (mixin.name === undefined) {
        console.log(`${mixin.__file} doesnt have name, pls set MIXIN name and try again `);
      }
      console.log(mixin);
      Vue.mixin( mixins)
    }

    // utils
    for (const utilName in utils)  {
      const util = utils[utilName]

      console.log(util);
      Vue[utilName] = util
    }



  }
}


if (typeof window !== 'undefined' && window.Vue) {
  console.log('USE');
  window.Vue.use(ComponentLibrary)
}
export default ComponentLibrary