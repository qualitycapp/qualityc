// src/views/UserList.js
var m = require("mithril")
var Repo = require("../models/Repo")

module.exports = {
    oninit: Repo.loadList,
    view: function () {
        return [
            m("section",
                [
                    m("input", {
                        "type": "text", "placeholder": "Filter repositories", "aria-label": "Filter repositories",
                        oninput: function (e) { Repo.query = e.target.value; Repo.search() },
                        value: Repo.query
                    }),
                    m("img", { src: "/svg/feather/search.svg", style: "margin-left: 10px;margin-top: -15px;" })
                ]
            ),
            m("section",
                Repo.list.map(function (repo) {
                    return m("aside",
                        [
                            m("h3", [
                                m("img", { src: "/svg/feather/folder" + (repo.private ? "-minus" : "") + ".svg", title: (repo.private ? "Private" : "Public"), style: { float: "left", "margin-right": "10px" } }),
                                m(m.route.Link, { href: "/repo/" + repo.full_name }, repo.name)]),
                            m("p", repo.description),
                            m("p", m("small", repo.updated_at))
                        ]
                    )
                }
                )

            )

        ]
    }
}