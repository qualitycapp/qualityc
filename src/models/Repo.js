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
    load: function (id) {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
            withCredentials: true,
        })
            .then(function (result) {
                Repo.current = result
            })
    },

    save: function () {
        return m.request({
            method: "PUT",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
            body: User.current,
            withCredentials: true,
        })
    }
}

module.exports = Repo