// src/models/User.js
var m = require("mithril")
var config = require("../../config")

const { Octokit } = require("@octokit/rest");

var User = {
    getLogin: function () {
        return localStorage.getItem('login')
    },
    getToken: function () {
        return localStorage.getItem('oauth-token')
    },
    isAuthenticated: function () {
        return Boolean(localStorage.getItem('oauth-token'))
    },
    isConsentGiven: function() {
        return localStorage.getItem('consent') === "yes"
    },
    giveConsent: function(){
        localStorage.setItem('consent', "yes")
    },
    withdrawConsent: function(){
        localStorage.removeItem('consent')
    },
    login: function () {
        var query = m.parseQueryString(window.location.search)

        if (!query.code) return

        return m.request({
            method: "GET",
            url: config.authenticationServer + "/authenticate/" + query.code
        })
            .then(function (data) {
                localStorage.setItem('oauth-token', data.token);
            }).then(function () {
                const octokit = new Octokit({
                    auth: localStorage.getItem('oauth-token')
                });
                return octokit.users.getAuthenticated();
            }).then(function ({ data }) {
                localStorage.setItem('login', data.login)
            }).then(function () {
                window.history.replaceState({}, document.title, "/");
            })
    },
    logout: function (){
        localStorage.removeItem('oauth-token')
        localStorage.removeItem('login')
        return m.redraw()
    }
}

module.exports = User