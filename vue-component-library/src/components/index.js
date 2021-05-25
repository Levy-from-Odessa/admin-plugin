
// import UI from './UI'
// import SimpleForm from './Form'
// import Layout from './Layout'
// import Button from './Button'

// import ValidationForm from './ValidationForm'
// console.log(ValidationForm);

// const components = {
//   ...UI,
//   ...SimpleForm,
//   ...Layout,
//   ...ValidationForm,
//   Button
// }

const modulesCache = {}
const componentsData = {  }

;(function updateModules() {
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireModule = require.context(
    // Search for files in the current directory.
    '.',
    // Search for files in subdirectories.
    true,
    // Include any .js files that are not this file or a unit test.
    /index\.vue$/
  )

  requireModule.keys().forEach((fileName) => {
    const moduleDefinition = requireModule(fileName)
    const componentName = moduleDefinition.default.name

    // const modules = moduleDefinition
    // Skip the module during hot reload if it refers to the
    // same module definition as the one we have cached.
    if (modulesCache[fileName] === moduleDefinition) return

    // Update the module cache, for efficient hot reloading.
    modulesCache[fileName] = moduleDefinition

    componentsData[componentName] = {
      // Modules are namespaced by default.
      ...moduleDefinition.default,
    }
  })

})()



export default componentsData