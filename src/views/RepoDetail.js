// src/views/UserForm.js
var m = require("mithril")
var Repo = require("../models/Repo")

module.exports = {
    oninit: function (vnode) { Repo.load(vnode.attrs.owner, vnode.attrs.name, vnode.attrs.path) },
    view: function () {
        return [
            m("h3", Repo.current.owner),
            m("h2", Repo.current.repo),
            m("form", { "method": "get" },
                m("div", { "class": "input-group mb-3" },
                    [
                        m("input", { "class": "form-control", "type": "text", "name": "term", "placeholder": "Search files", "aria-label": "Search files", "aria-describedby": "icoSearch" }),
                        m("div", { "class": "input-group-append" },
                            m("button", { "class": "btn btn-outline-secondary", "type": "submit", "id": "icoSearch", "title": "Search files" },
                                m("img", { "src": "/svg/feather/search.svg", "height": "20" })
                            )
                        )
                    ]
                )
            ),
            m("div", { "class": "list-group list-group-flush" },
                [
                    m(m.route.Link, {
                        "class": "list-group-item list-group-item-action d-flex justify-content-between align-items-center",
                        href:
                            Repo.current.path ?
                                "/repo/" + Repo.current.owner + "/" + Repo.current.repo + "/" +
                                (Repo.current.path.includes("/") ? Repo.current.path.substring(0, Repo.current.path.lastIndexOf("/")) : "") : "/"
                    },
                        m("span", { "title": "Go to parent" },
                            [
                                " .",
                                m.trust("&#8202;"),
                                ". "
                            ]
                        )
                    ),
                    Repo.contents.sort(function(a, b) {
                        return a.type.localeCompare(b.type)
                    }).map(function (content) {
                        return m(m.route.Link, {
                            "class": "list-group-item list-group-item-action d-flex justify-content-between align-items-center", "href": "/repo/" + Repo.current.owner + "/" + Repo.current.repo + "/" + content.path
                        },
                            [
                                m("span", { "class": "liFile" },
                                    [
                                        m("img", { "class": "pb-1", "src": "/svg/feather/" + (content.type == "file" ? "file" : "folder") + ".svg", "title": "File" }),
                                        " " + content.name + " "
                                    ]
                                ),
                                content.type == "file" ?
                                    m("span", { "class": "btn btn-outline-secondary" },
                                        "Edit"
                                    ) : ""
                            ]
                        )
                    })
                ]
            )
        ]
    }
}