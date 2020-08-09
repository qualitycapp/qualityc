// src/index.js
var m = require("mithril")

var RepoList = require("./views/RepoList")
var RepoDetail = require("./views/RepoDetail")
var Layout = require("./views/Layout")
var About = require("./views/About")
var Privacy = require("./views/Privacy")

m.route(document.body, "/", {
    "/": {
        render: function () {
            return m(Layout, m(RepoList))
        }
    },
    "/repo/:owner/:name": {
        render: function (vnode) {
            return m(Layout, m(RepoDetail, vnode.attrs))
        }
    },
    "/about": {
        render: function () {
            return m(Layout, {isPublic: true} , m(About))
        }
    },
    "/privacy": {
        render: function () {
            return m(Layout, {isPublic: true} , m(Privacy))
        }
    }
})