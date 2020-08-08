// src/index.js
var m = require("mithril")
var cookie = require('./cookie')

var UserList = require("./views/UserList")
var UserForm = require("./views/UserForm")
var Layout = require("./views/Layout")

var query = m.parseQueryString(window.location.search)

if (query.code){
    m.request({
        method: "GET",
        url: "https://gatokeepero.herokuapp.com/authenticate/" + query.code
    })
    .then(function(data) {
        cookie.set('oauth-token', data.token);
        window.location.replace("/");
    })
}

m.route(document.body, "/list", {
    "/list": {
        render: function() {
            return m(Layout, m(UserList))
        }
    },
    "/edit/:id": {
        render: function(vnode) {
            return m(Layout, m(UserForm, vnode.attrs))
        }
    },
})