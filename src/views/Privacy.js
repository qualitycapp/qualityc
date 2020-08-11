// src/views/Privacy.js
var m = require("mithril")
var User = require("../models/User")

module.exports = {
  view: function () {
    return m("header", [
      m("p",
        "Use this page to detail your site's privacy policy."
      ),
      User.isConsentGiven() ? m(m.route.Link, {
        "href": "", onclick: function (e) {
          e.preventDefault()
          User.withdrawConsent()
        }
      },
        "Revoke Cookie Consent"
      ) : ""
    ]
    )
  }
}