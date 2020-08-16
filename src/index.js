// src/index.js
var m = require("mithril")

var RepoList = require("./views/RepoList")
var RepoDetail = require("./views/RepoDetail")
var Layout = require("./views/Layout")
var About = require("./views/About")
var Privacy = require("./views/Privacy")
var Editor = require("./views/Editor")
var Report = require("./views/Report")

m.route(document.body, "/", {
    "/": {
        render: function () {
            return m(Layout, { header: "Repositories" }, m(RepoList))
        }
    },
    "/repo/:owner/:name": {
        render: function (vnode) {
            return m(Layout, { title: vnode.attrs.name, header: vnode.attrs.owner + "/" + vnode.attrs.name }, m(RepoDetail, vnode.attrs))
        }
    },
    "/repo/:owner/:name/:path...": {
        render: function (vnode) {
            vnode.attrs.key = vnode.attrs.path
            return m(Layout, { title: vnode.attrs.name, header: vnode.attrs.owner + "/" + vnode.attrs.name + "/" + vnode.attrs.path } , m(RepoDetail, vnode.attrs))
        }
    },
    "/edit/:owner/:name/:path...": {
        render: function (vnode) {
            return m(Layout, { title: vnode.attrs.name, header: vnode.attrs.owner + "/" + vnode.attrs.name + "/" + vnode.attrs.path } , m(Editor, vnode.attrs))
        }
    },
    "/report/:owner/:name/:sha": {
        render: function (vnode) {
            return m(Layout, { title: vnode.attrs.name, header: vnode.attrs.owner + "/" + vnode.attrs.name } , m(Report, vnode.attrs))
        }
    },
    "/about": {
        render: function () {
            return m(Layout, {isPublic: true, title: "About", header: "About"} , m(About))
        }
    },
    "/privacy": {
        render: function () {
            return m(Layout, {isPublic: true, title: "Privacy", header: "Privacy"} , m(Privacy))
        }
    }
})