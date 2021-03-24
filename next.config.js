require('dotenv').config({ path: `./environments/${process.env.ENVIRONMENT}.env`})
// require('dotenv').config({ path: `./environments/development.env`})
// require('dotenv').config({ path: `./environments/localhost.env`})
console.log(process.env)
module.exports = {
    publicRuntimeConfig: {
        LOCAL_STORAGE_PREFIX: process.env.BASE_API.replace(/\W/g, ''),
        BASE_API: process.env.BASE_API,
        SOCKET_IO_URL: process.env.SOCKET_IO_URL
    }
}