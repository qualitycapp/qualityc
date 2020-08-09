// src/views/Login.js
var m = require("mithril")
var config = require("../../../config")
var User = require("../../models/User")

module.exports = {
    view: function () {
        return [
            User.isConsentGiven() ? "" : m("div", { "class": "alert alert-info alert-dismissible fade show", "id": "cookieConsent", "role": "alert" },
                [
                    " We use cookies to remember it is you and log your behaviour on our site to analyze and improve our service. ",
                    m(m.route.Link, { "href": "/privacy" },
                        "Learn More"
                    ),
                    m("button", {
                        "class": "accept-policy close", "type": "button", "data-dismiss": "alert", "aria-label": "Close",
                        onclick: function () {
                            User.giveConsent()
                        }
                    },
                        m("span", { "aria-hidden": "true" },
                            "Accept"
                        )
                    )
                ]
            ),
            m("div", { "class": "row justify-content-center" },
                m("div", { "class": "col-xl-4 col-lg-5 col-md-6 col-8" },
                    m("div", { "class": "shadow-sm jumbotron text-center" },
                        [
                            m("img", { "class": "mb-3", "src": "/img/qualitycapp.png", "style": { "width": "220px" } }),
                            m("p",
                                "Qualityc.app is a test editor for GitHub, designed for software testing. "
                            ),
                            m("p", { "class": "mb-5" },
                                m(m.route.Link, { "href": "/about" },
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
        ]
    }
}