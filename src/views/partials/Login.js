// src/views/partial/Login.js
var m = require("mithril")
var config = require("../../../config")

module.exports = {
    view: function () {
        return m("section",
            m("form",
                [
                    m("header", [m("img", { "src": "/img/logowobrand.png" }), m("h2", "qualityc.app")]),
                    m("p", "Qualityc.app is a code editor for GitHub,", m("br"), " designed for software testing."),
                    m("p", m(m.route.Link, { "href": "/about" }, "Learn more")),
                    m("a", { href: "https://github.com/login/oauth/authorize?client_id=" + config.clientId + "&scope=repo" },
                        m("b", { style: { color: "var(--color-text)" } },
                            [
                                m("img", { "src": "/svg/feather/github.svg", "style": { filter: "invert(100%)", float: "left", "margin-right": "10px" } }),
                                "Login with GitHub"
                            ]
                        )
                    )
                ]
            )
        )
    }
}