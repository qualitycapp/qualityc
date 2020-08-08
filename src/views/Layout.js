// src/views/Layout.js
var m = require("mithril")

module.exports = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m(m.route.Link, {href: "/list"}, "Users"),
                m("a", {href: "https://github.com/login/oauth/authorize?client_id=bc94ea3c80919ac83867&scope=repo"}, "Github Login")
            ]),
            m("section", vnode.children)
        ])
    }
}