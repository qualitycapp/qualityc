// src/views/Layout.js
var m = require("mithril")
var User = require("../models/User")
var Login = require("./partials/Login")

module.exports = {
    oninit: User.login,
    view: function (vnode) {
        document.title = (vnode.attrs.title ?  vnode.attrs.title + " - " : "") + "qualityc.app"
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
                            m("span", { "aria-hidden": "true" },
                                "Accept"
                            )
                        )
                    )
                )
            ),
            m("header",
                m("nav",
                    [
                        m(m.route.Link, { "href": "/" }, m("img", { "src": "/img/logo.png", "alt": "qualityc.app" })),
                        m("ul",
                            User.isAuthenticated() ? [
                                m("li",
                                    [
                                        m("a", { "href": "#" },
                                            m("img", { "src": "https://github.com/" + User.getLogin() + ".png?size=30", "width": "30", "height": "30", "alt": "User" })
                                        ),
                                        m("ul",
                                            [m("li",
                                                m("a", {
                                                    href: "", onclick: function (e) {
                                                        e.preventDefault()
                                                        User.logout()
                                                    }
                                                },
                                                    "Sign out"
                                                ))
                                            ]
                                        )
                                    ]
                                )
                            ] : [
                                    m("li", m(m.route.Link, { "href": "/about" }, "About")),
                                    m("li", m(m.route.Link, { "href": "/" }, "Sign in"))
                                ]
                        )
                    ]
                ),
                vnode.attrs.title ? m("h1", vnode.attrs.title) : ""
            ), //header
            m("main",
                (vnode.attrs.isPublic || User.isAuthenticated()) ? m("section", vnode.children) : m(Login)
            ),
            m("footer", [
                m("hr"),
                m("p",
                    m("small",
                        [
                            m.trust("&copy;"),
                            " 2020 - qualityc.app - Made by ",
                            m("a", { "href": "https://olcay.dev" }, "olcay.dev"),
                            " - ",
                            m(m.route.Link, { "href": "/privacy" }, "Privacy")
                        ]
                    )
                )
            ]
            )
        ]
    }
}