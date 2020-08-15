// config.js

module.exports = {
    clientId: process.env.production ?
        "bc94ea3c80919ac83867" : "816cddbfe65b5b44beaf",
    authenticationServer: process.env.production ?
        "https://qualityc-hodor.herokuapp.com" : "https://gatokeepero.herokuapp.com"
}