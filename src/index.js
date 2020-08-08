// src/index.js
var m = require("mithril")

var RepoList = require("./views/RepoList")
var RepoDetail = require("./views/RepoDetail")
var Layout = require("./views/Layout")

m.route(document.body, "/list", {
    "/list": {
        render: function () {
            return m(Layout, m(RepoList))
        }
    },
    "/repo/:owner/:name": {
        render: function (vnode) {
            return m(Layout, m(RepoDetail, vnode.attrs))
        }
    },
})