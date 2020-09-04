// src/views/Layout.js
var m = require("mithril")
var User = require("../models/User")
var Login = require("./partials/Login")
require("../../styles.css")
require("../../lib/mvp.css/mvp.css")

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
                        m(m.route.Link, { href: "/?source=nav" }, m("img", { "src": "/img/logo.png", "alt": "qualityc.app" })),
                        m("p", vnode.attrs.title),
                        m("ul",
                            User.isAuthenticated() ? [
                                m("li",
                                    [
                                        m("a", {
                                            href: "#", onclick: function (e) {
                                                e.preventDefault()
                                            }
                                        }, User.getLogin()),
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
                vnode.attrs.header && canView ? m("h3", vnode.attrs.header) : ""
            ), //header
            m("main", canView ? vnode.children : m(Login)),
            m("footer", [
                m("hr"),
                m("p",
                    m("small",
                        [
                            m.trust("&copy;"),
                            " 2020 ",
                            m(m.route.Link, { "href": "/?source=footer" }, "qualityc.app"),
                            m.trust(" &middot; "),
                            m(m.route.Link, { "href": "/privacy" }, "Privacy"),
                            m.trust(" &middot; "),
                            m(m.route.Link, { "href": "/about" }, "About")
                        ]
                    )
                ),
                m("p",
                    m("small",
                        [
                            "Made by ",
                            m("a", { "href": "https://olcay.dev" }, "olcay.dev")
                        ]
                    )
                )
            ]
            )
        ]
    }
}