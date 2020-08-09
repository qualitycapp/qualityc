// src/views/Login.js
var m = require("mithril")
var config = require("../../config")

module.exports = {
    view: function () {
        return m("div", { "class": "row justify-content-center" },
            m("div", { "class": "col-xl-4 col-lg-5 col-md-6 col-8" },
                m("div", { "class": "shadow-sm jumbotron text-center" },
                    [
                        m("img", { "class": "mb-3", "src": "/img/qualitycapp.png", "style": { "width": "220px" } }),
                        m("p",
                            "Qualityc.app is a test editor for GitHub, designed for software testing. "
                        ),
                        m("p", { "class": "mb-5" },
                            m("a", { "href": "/Home/About" },
                                "Learn more"
                            )
                        ),
                        m("a", {
                            "class": "btn btn-lg btn-dark",
                            href: "https://github.com/login/oauth/authorize?client_id=" + config.clientId + "&scope=repo"
                        },
                            [
                                m("img", { "src": "/svg/feather/github.svg", "style": { "filter": "invert(100%)" } }),
                                " Login with GitHub "
                            ]
                        )
                    ]
                )
            )
        )
    }
}