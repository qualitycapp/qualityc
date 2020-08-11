// src/views/Editor.js
var m = require("mithril")
var File = require("../models/File")

module.exports = {
    onupdate: function (vnode) {
        CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
            viewportMargin: Infinity
        });
    },
    oninit: function (vnode) { File.load(vnode.attrs.owner, vnode.attrs.name, vnode.attrs.path) },
    view: function () {
        return [m("header", m("p", [
            m("a", { href: "#" }, m("b", m("img", { src: "/svg/feather/save.svg", style: "filter: invert(100%);" })))
        ])),
        m("textarea", { id: "code" }, m.trust(File.content.content))]
    }
}