"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_dom_1 = require("react-dom");
var src_1 = __importDefault(require("../src"));
exports.elements = {
    EL1: {},
    EL2: {},
    EL3: {},
    EL4: {}
};
// NOTE don't style this way in the production apps
var styles = {
    container: {
        display: "flex",
        flexDirection: "row"
    },
    colNav: {
        width: 300,
        background: "#BEE9E8"
    },
    menu: {
        position: "fixed",
        top: 0,
        padding: 20
    },
    menuLink: {
        cursor: "pointer",
        padding: "5px 0",
        transition: "all .2s ease-out"
    },
    menuLinkActive: {
        cursor: "pointer",
        fontWeight: "bold",
        padding: "5px 20px",
        transition: "all .2s ease-out"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    section: {
        width: "100%",
        height: "70vh"
    }
};
var App = function () { return (React.createElement(src_1.default, { elements: exports.elements }, function (_a) {
    var refs = _a.refs, activeElement = _a.activeElement, goTo = _a.goTo;
    return (React.createElement("div", { style: styles.container },
        React.createElement("div", { style: styles.colNav },
            React.createElement("div", { style: styles.menu },
                React.createElement("div", { style: activeElement === "EL1"
                        ? styles.menuLinkActive
                        : styles.menuLink, onClick: function () { return goTo("EL1"); } }, "ONE"),
                React.createElement("div", { style: activeElement === "EL2"
                        ? styles.menuLinkActive
                        : styles.menuLink, onClick: function () { return goTo("EL2"); } }, "TWO"),
                React.createElement("div", { style: activeElement === "EL3"
                        ? styles.menuLinkActive
                        : styles.menuLink, onClick: function () { return goTo("EL3"); } }, "THREE"),
                React.createElement("div", { style: activeElement === "EL4"
                        ? styles.menuLinkActive
                        : styles.menuLink, onClick: function () { return goTo("EL4"); } }, "FOUR"))),
        React.createElement("div", { style: styles.content },
            React.createElement("div", { ref: refs.EL1, style: __assign({}, styles.section, { background: "#62B6CB" }) }),
            React.createElement("div", { ref: refs.EL2, style: __assign({}, styles.section, { background: "#1B4965" }) }),
            React.createElement("div", { ref: refs.EL3, style: __assign({}, styles.section, { background: "#62B6CB" }) }),
            React.createElement("div", { ref: refs.EL4, style: __assign({}, styles.section, { background: "#1B4965" }) }))));
})); };
react_dom_1.render(React.createElement(App, null), document.getElementById("root"));
