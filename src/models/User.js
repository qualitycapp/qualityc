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
    isConsentGiven: function() {
        return cookie.get('consent') === "yes"
    },
    giveConsent: function(){
        cookie.set('consent', "yes", 365)
    },
    withdrawConsent: function(){
        cookie.unset('consent')
    },
    login: function () {
        var code = m.route.param("code")

        if (!code) return

        return m.request({
            method: "GET",
            url: config.authenticationServer + "/authenticate/" + code
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
        cookie.unset('login')
        return m.redraw()
    }
}

module.exports = User