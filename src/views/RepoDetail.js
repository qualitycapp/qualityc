// src/views/UserForm.js
var m = require("mithril")
var Repo = require("../models/Repo")

module.exports = {
    oninit: function(vnode) {Repo.load(vnode.attrs.id)},
    view: function() {
        return m("form", {
                onsubmit: function(e) {
                    e.preventDefault()
                    Repo.save()
                }
            }, [
            m("label.label", "First name"),
            m("input.input[type=text][placeholder=First name]", {
                oninput: function (e) {Repo.current.firstName = e.target.value},
                value: Repo.current.firstName
            }),
            m("label.label", "Last name"),
            m("input.input[placeholder=Last name]", {
                oninput: function (e) {Repo.current.lastName = e.target.value},
                value: Repo.current.lastName
            }),
            m("button.button[type=submit]", "Save"),
        ])
    }
}