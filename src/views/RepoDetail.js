// src/views/RepoDetail.js
var m = require("mithril")
var Repo = require("../models/Repo")

module.exports = {
    oninit: function (vnode) { Repo.load(vnode.attrs.owner, vnode.attrs.name, vnode.attrs.path) },
    view: function () {
        return [
            m("section",
                [
                    m("input", {
                        "type": "text", "placeholder": "Search files", "aria-label": "Search files",
                        oninput: function (e) {
                            Repo.current.searchTerm = e.target.value
                            Repo.searchContent()
                        },
                        value: Repo.current.searchTerm
                    }),
                    m("img", { src: "/svg/feather/search.svg", style: "margin-left: 10px;margin-top: -15px;" })
                ]
            ),

            m("ul", { style: { "list-style-type": "none" } },
                [
                    m("li", m(m.route.Link, {
                        href:
                            Repo.current.path ?
                                "/repo/" + Repo.current.owner + "/" + Repo.current.repo + "/" +
                                (Repo.current.path.includes("/") ? Repo.current.path.substring(0, Repo.current.path.lastIndexOf("/")) : "") : "/"
                    },
                        m("span", { "title": "Go to parent" }, m.trust(".&#8202;."))
                    )),
                    Repo.contents.length > 0 ? Repo.contents.sort(function (a, b) {
                        return a.type.localeCompare(b.type)
                    }).map(function (content) {
                        return m("li", m(m.route.Link, {
                            href: (content.type == "file" ? "/edit/" : "/repo/") + Repo.current.owner + "/" + Repo.current.repo + "/" + content.path
                        },
                            [
                                m("img", {
                                    src: "/svg/feather/" + (content.type == "file" ? "file" : "folder") + ".svg",
                                    title: (content.type == "file" ? "File" : "Folder"),
                                    style: { float: "left", "margin-right": "10px" }
                                }),
                                content.name
                            ]
                        )
                        )
                    }
                    ) : m("div", { "class": "lds-ellipsis" },
                        [
                            m("div"), m("div"), m("div"), m("div")
                        ]
                    )
                ]
            )
        ]
    }
}