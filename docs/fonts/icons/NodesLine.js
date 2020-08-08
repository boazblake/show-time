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
var NodesLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "nodes-line"), mithril_1.default("path", { "d": "M10.5,34.29,2,29.39V19.58l8.5-4.9,8.5,4.9v9.81ZM4,28.23,10.5,32,17,28.23V20.74L10.5,17,4,20.74Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M25.5,34.29,17,29.39V19.58l8.5-4.9,8.5,4.9v9.81ZM19,28.23,25.5,32,32,28.23V20.74L25.5,17,19,20.74Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M18,21.32l-8.5-4.9V6.61L18,1.71l8.5,4.9v9.81Zm-6.5-6.06L18,19l6.5-3.75V7.77L18,4,11.5,7.77Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NodesLine;
