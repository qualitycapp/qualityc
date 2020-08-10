// src/models/Repo.js
var m = require("mithril")
var User = require("./User")

const { Octokit } = require("@octokit/rest");

var Repo = {
    query: "",
    list: [],
    loadList: function () {
        const octokit = new Octokit({ auth: User.getToken() });

        return octokit.repos.listForAuthenticatedUser({ sort: "updated" })
            .then(function ({ data }) {
                Repo.list = data
                m.redraw()
            })
    },
    search: function () {
        const octokit = new Octokit({ auth: User.getToken() });

        return octokit.search.repos({ q: Repo.query + "+user:" + User.getLogin(), sort: "updated" })
            .then(function ({ data }) {
                Repo.list = data.items
                m.redraw()
            })
    },

    current: {},
    contents: [],
    load: function (owner, repo, path) {
        const octokit = new Octokit({ auth: User.getToken() });

        Repo.current = { owner, repo, path };

        return octokit.repos.getContent({ owner, repo, path })
            .then(function ({ data }) {
                
                Repo.contents = data
                m.redraw()
            })
    },

    searchContent: function () {
        if (!Repo.current.searchTerm) return Repo.load(Repo.current.owner, Repo.current.repo, Repo.current.path)
        const octokit = new Octokit({ auth: User.getToken() });

        return octokit.search.code({ q: Repo.current.searchTerm + "+repo:" + Repo.current.owner + "/" + Repo.current.repo, sort: "updated" })
            .then(function ({ data }) {
                Repo.contents = data.items
                Repo.contents.forEach(content => { content['type'] = "file" })
                m.redraw()
            })
    },
    clearSearchTerm: function () {
        Repo.current.searchTerm = ""
        return Repo.load(Repo.current.owner, Repo.current.repo, Repo.current.path)
    }
}

module.exports = Repo