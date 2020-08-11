// src/views/Login.js
var m = require("mithril")
var config = require("../../../config")
var User = require("../../models/User")

module.exports = {
    view: function () {
        return m("section", 
                m("form", 
                        [
                            m("header", m("img", { "src": "/img/qualitycapp.png", "style": { "width": "220px" } }) ),
                            
                            m("p", [
                                "Qualityc.app is a test editor for GitHub,",m("br")," designed for software testing."]
                            ),
                            m("p", 
                                m(m.route.Link, { "href": "/about" },
                                    "Learn more"
                                )
                            ),
                            m("a", {
                                href: "https://github.com/login/oauth/authorize?client_id=" + config.clientId + "&scope=repo"
                            },
                            m("b",
                                [
                                    m("img", { "src": "/svg/feather/github.svg", "style": { "filter": "invert(100%)", float: "left" } }),
                                    " Login with GitHub "
                                ]
                                )
                            )
                        ]
                    
                )
            )
        
    }
}