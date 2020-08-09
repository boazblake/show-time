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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(require("mithril"));
var ConnectLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "connect-line"), mithril_1.default("path", { "d": "M34,17H28.23A6.25,6.25,0,0,0,22,12H14.15a6.25,6.25,0,0,0-6.21,5H2v2H7.93a6.22,6.22,0,0,0,6.22,5H22a6.22,6.22,0,0,0,6.22-5H34ZM17.08,22H14.15a4.17,4.17,0,0,1-4.31-4,4.17,4.17,0,0,1,4.31-4h2.94ZM22,22H19V14h3a4.17,4.17,0,0,1,4.31,4A4.17,4.17,0,0,1,22,22Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ConnectLine;
