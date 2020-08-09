// src/views/UserList.js
var m = require("mithril")
var Repo = require("../models/Repo")

module.exports = {
    oninit: Repo.loadList,
    view: function () {
        return [
            m("h2",
                "Explore Projects"
            ),
            m("div", { "class": "input-group mb-5" },
                [
                    m("div", { "class": "input-group-prepend" },
                        m("span", { "class": "input-group-text", "id": "icoSearch" },
                            m("img", { "src": "/svg/feather/search.svg" })
                        )
                    ),
                    m("input", {
                        "class": "form-control", "type": "text", "placeholder": "Filter projects", "aria-label": "Filter projects", "aria-describedby": "icoSearch",

                        oninput: function (e) { Repo.query = e.target.value; Repo.search() },
                        value: Repo.query
                    })
                ]
            ),
            m("div", { "class": "list-group list-group-flush" },
                Repo.list.map(function (repo) {
                    return m(m.route.Link, { "class": "list-group-item list-group-item-action d-flex justify-content-between align-items-center", "href": "/repo/" + repo.full_name },
                        [
                            m("span", { "class": "liProject" },
                                [
                                    m("img", { "class": "pb-1", "src": repo.private ? "/svg/feather/folder-minus.svg" : "/svg/feather/folder.svg", "title": repo.private ? "Private" : "Public" }),
                                    " " + repo.name + " "
                                ]
                            ),
                            m("span", { "class": "btn btn-outline-secondary" },
                                "Open Project"
                            )
                        ]
                    )
                }
                )
            )
        ]
    }
}