// src/models/User.js
var m = require("mithril")
var cookie = require('../cookie')

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: cookie.get('oauth-token')
});

var User = {
    getLogin: function () {
        return cookie.get('login')
    },
    login: function () {
        var query = m.parseQueryString(window.location.search)

        if (!query.code) return

        return m.request({
            method: "GET",
            url: "https://gatokeepero.herokuapp.com/authenticate/" + query.code
        })
            .then(function (data) {
                cookie.set('oauth-token', data.token);
            }).then(function () {
                const octokit = new Octokit({
                    auth: cookie.get('oauth-token')
                });
                return octokit.users.getAuthenticated();
            }).then(function ({ data }) {
                cookie.set('login', data.login)
            }).then(function () {
                window.location.replace("/");
            })
    },
}

module.exports = User