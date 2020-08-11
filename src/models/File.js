// src/models/File.js
var m = require("mithril")
var User = require("./User")

const { Octokit } = require("@octokit/rest");

var File = {
    current: {},
    content: {},
    load: function (owner, repo, path) {
        const octokit = new Octokit({ auth: User.getToken() })

        File.current = { owner, repo, path }
        File.content = {}

        return octokit.repos.getContent({ owner, repo, path })
            .then(function ({ data }) {
                data.content = window.atob(data.content)

                File.content = data
                return m.redraw()
            })
    }
}

module.exports = File