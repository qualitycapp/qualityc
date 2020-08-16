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
                data.content = window.atob(data.content).replace(/\r/g, "")
                File.current.sha = data.sha
                File.content = data
                return m.redraw()
            })
    },

    diff: "",
    modifiedContent: "",
    calculateDiff: function () {
        var dmp = new diff_match_patch()
        var diff = dmp.diff_main(File.content.content, File.modifiedContent)
        File.diff = dmp.diff_prettyHtml(diff)
        m.redraw()
    },

    message: "",
    save: function () {
        const octokit = new Octokit({ auth: User.getToken() })

        var content = window.btoa(File.modifiedContent)

        return octokit.repos.createOrUpdateFileContents({
            owner: File.current.owner,
            repo: File.current.repo,
            path: File.current.path,
            message: File.message,
            content: content,
            sha: File.current.sha
        }).then(function ({ data }) {
            return m.route.set("/report/" + File.current.owner + "/" + File.current.repo + "/" + data.commit.sha)
        })
    }
}

module.exports = File