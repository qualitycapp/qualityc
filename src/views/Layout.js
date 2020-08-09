// src/views/Layout.js
var m = require("mithril")
var User = require("../models/User")
var Login = require("./Login")

module.exports = {
    oninit: User.login,
    view: function (vnode) {
        return [m("header",
            m("nav", { "class": "navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3" },
                m("div", { "class": "container" },
                    [
                        m(m.route.Link, { "class": "navbar-brand", "href": "/" },
                            "qualityc.app"
                        ),
                        m("button", { "class": "navbar-toggler", "type": "button", "data-toggle": "collapse", "data-target": ".navbar-collapse", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                            m("span", { "class": "navbar-toggler-icon" })
                        ),
                        m("div", { "class": "navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse" },
                            m("ul", { "class": "navbar-nav" },
                                User.isAuthenticated() ? [
                                    m("li", { "class": "nav-item dropdown" },
                                        [
                                            m("a", { "class": "nav-link dropdown-toggle", "href": "#", "id": "navbarDropdown", "role": "button", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                                                m("img", { "class": "rounded-circle", "src": "https://github.com/" + User.getLogin() + ".png?size=30", "width": "30", "height": "30", "alt": "", "loading": "lazy" })
                                            ),
                                            m("div", { "class": "dropdown-menu", "aria-labelledby": "navbarDropdown" },
                                                m("a", {
                                                    "class": "dropdown-item", href: "", onclick: function (e) {
                                                        e.preventDefault()
                                                        User.logout()
                                                    }
                                                },
                                                    "Sign out"
                                                )
                                            )
                                        ]
                                    )
                                ] : [
                                        m("li", { "class": "nav-item" },
                                            m(m.route.Link, { "class": "nav-link text-light", "href": "/about" },
                                                "About"
                                            )
                                        ),
                                        m("li", { "class": "nav-item" },
                                            m(m.route.Link, { "class": "nav-link text-light", "href": "/" },
                                                "Sign in"
                                            )
                                        )
                                    ]
                            )
                        )
                    ]
                )
            )
        ),
        m("div", { "class": "container" },
            m("main", { "class": "pb-3", "role": "main" }, (vnode.attrs.isPublic || User.isAuthenticated()) ? m("section", vnode.children) : m(Login))
        ),
        m("footer", { "class": "border-top footer text-muted" },
            m("div", { "class": "container" },
                [
                    " ",
                    m.trust("&copy;"),
                    " 2020 - qualityc.app - Made by ",
                    m("a", { "href": "https://olcay.dev" },
                        "olcay.dev"
                    ),
                    " - ",
                    m(m.route.Link, { "href": "/privacy" },
                        "Privacy"
                    )
                ]
            )
        )
        ]
    }
}