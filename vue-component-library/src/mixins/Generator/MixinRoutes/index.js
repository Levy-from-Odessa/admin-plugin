const fs = require('fs')
const { generateRoutes } = require('vue-route-generator')

const code = generateRoutes({
  pages: '@/router/pages'
})

console.log(code);
fs.writeFileSync('./router/routes.js', code)