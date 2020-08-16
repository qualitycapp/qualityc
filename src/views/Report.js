// src/views/Report.js
var m = require("mithril")

module.exports = {
    view: function (vnode) {
        return [
            m("header", m("p",
                m(m.route.Link, { href: "/repo/" + vnode.attrs.owner + "/" + vnode.attrs.name },
                    m("b", m("img", { src: "/svg/feather/pen-tool.svg", style: "filter: invert(100%);" }))))),
            m("div", { style: "margin:0px;padding:0px;overflow:hidden" },
                m("iframe",
                    {
                        src: "https://qualityc-report.herokuapp.com/report/display/" + vnode.attrs.sha,
                        frameborder: "0", style: "overflow:hidden;min-height:5105px;", height: "100%", width: "100%"
                    }))]
    }
}