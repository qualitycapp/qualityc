// src/models/User.js
var m = require("mithril")
var cookie = require('../cookie')

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: cookie.get('oauth-token')
  });

var User = {
    list: [],
    loadList: function() {
        return octokit.repos.listForAuthenticatedUser()
        .then(function( {data} ) {
            User.list = data
            m.redraw()
          })
    },

    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
            withCredentials: true,
        })
        .then(function(result) {
            User.current = result
        })
    },

    save: function() {
        return m.request({
            method: "PUT",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
            body: User.current,
            withCredentials: true,
        })
    }
}

module.exports = User