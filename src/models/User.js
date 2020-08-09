// src/models/User.js
var m = require("mithril")
var cookie = require('../cookie')
var config = require("../../config")

const { Octokit } = require("@octokit/rest");

var User = {
    getLogin: function () {
        return cookie.get('login')
    },
    getToken: function () {
        return cookie.get('oauth-token')
    },
    isAuthenticated: function () {
        return (cookie.get('oauth-token'))
    },
    login: function () {
        var query = m.parseQueryString(window.location.search)

        if (!query.code) return

        return m.request({
            method: "GET",
            url: config.authenticationServer + "/authenticate/" + query.code
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
                window.history.replaceState({}, document.title, "/");
            })
    },
    logout: function (){
        cookie.unset('oauth-token')
        return m.redraw()
    }
}

module.exports = User