// src/views/Editor.js
var m = require("mithril")
var File = require("../models/File")
var editor, isDarkMode = false

module.exports = {
    oncreate: function (vnode) {
        editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
            viewportMargin: Infinity,
            theme: (isDarkMode ? "blackboard" : "default")
        })
    },
    onremove: function () {
        editor.toTextArea()
    },
    onupdate: function () {
        editor.getDoc().setValue(File.content.content)
    },
    oninit: function (vnode) {
        File.load(vnode.attrs.owner, vnode.attrs.name, vnode.attrs.path)

        var darkMode = localStorage.getItem('darkMode')
        if (darkMode) {
            isDarkMode = darkMode === "on"
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                isDarkMode = true
                localStorage.setItem("darkMode", "on")
            }
        }
    },
    view: function () {
        return [m("header", m("p", [
            m("a", { href: "#" }, m("b", m("img", { src: "/svg/feather/save.svg", style: "filter: invert(100%);" }))),
            m("a", {
                href: "#", onclick: function (e) {
                    e.preventDefault()
                    isDarkMode = !isDarkMode
                    editor.setOption("theme", (isDarkMode ? "blackboard" : "default"))
                    if (isDarkMode) localStorage.setItem("darkMode", "on")
                    else localStorage.setItem("darkMode", "off")
                }
            }, isDarkMode ?
                m("i", m("img", { src: "/svg/feather/sun.svg" })) :
                m("b", { style: { "background-color": "#0C1021" } }, m("img", { src: "/svg/feather/moon.svg", style: "filter: invert(100%);" }))
            )
        ])),
        m("textarea", { id: "code" })]
    }
}