// src/views/About.js
var m = require("mithril")

module.exports = {
    view: function () {
        return [
            m("h1", 
              "About"
            ), 
            m("p", 
              "Use this page to give detail about your site."
            )
          ]
    }
}