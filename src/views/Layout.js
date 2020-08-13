// src/views/Layout.js
var m = require("mithril")
var User = require("../models/User")
var Login = require("./partials/Login")

module.exports = {
    oninit: User.login,
    view: function (vnode) {
        var canView = vnode.attrs.isPublic || User.isAuthenticated()
        document.title = (vnode.attrs.title && canView ? vnode.attrs.title + " - " : "") + "qualityc.app"

        return [
            User.isConsentGiven() ? "" : m("article",
                m("aside",
                    m("p",
                        " We use cookies to remember it is you and log your behaviour on our site to analyze and improve our service. ",
                        m(m.route.Link, { "href": "/privacy" }, "Learn More"),
                        m("a", {
                            style: "float:right;", href: "",
                            onclick: function (e) {
                                e.preventDefault()
                                User.giveConsent()
                            }
                        },
                            m("span", { "aria-hidden": "true" }, "Accept")
                        )
                    )
                )
            ),
            m("header",
                canView ? m("nav",
                    [
                        m(m.route.Link, { "href": "/" }, m("img", { "src": "/img/logo.png", "alt": "qualityc.app" })),
                        m("ul",
                            User.isAuthenticated() ? [
                                m("li",
                                    [
                                        m("a", { "href": "#" }, User.getLogin()),
                                        m("ul",
                                            [m("li",
                                                m("a", {
                                                    href: "", onclick: function (e) {
                                                        e.preventDefault()
                                                        User.logout()
                                                    }
                                                }, "Sign out"))
                                            ]
                                        )
                                    ]
                                )
                            ] : [
                                    m("li", m(m.route.Link, { "href": "/" }, "Sign in"))
                                ]
                        )
                    ]
                ) : "",
                vnode.attrs.header && canView ? m("h1", vnode.attrs.header) : ""
            ), //header
            m("main", canView ? vnode.children : m(Login)),
            m("footer", [
                m("hr"),
                m("p",
                    m("small",
                        [
                            m.trust("&copy;"),
                            " 2020",
                            m.trust(" &middot; "),
                            m("a", { "href": "/?source=footer" }, "qualityc.app"),
                            m.trust(" &middot; "),
                            "Made by ",
                            m("a", { "href": "https://olcay.dev" }, "olcay.dev"),
                            m.trust(" &middot; "),
                            m(m.route.Link, { "href": "/privacy" }, "Privacy"),
                            m.trust(" &middot; "),
                            m(m.route.Link, { "href": "/about" }, "About")
                        ]
                    )
                )
            ]
            )
        ]
    }
}