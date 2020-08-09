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
var BicycleLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bicycle-line"), mithril_1.default("path", { "d": "M8.5,29.65A6.51,6.51,0,0,1,2,23.15a6.39,6.39,0,0,1,6.5-6.36A6.39,6.39,0,0,1,15,23.15,6.51,6.51,0,0,1,8.5,29.65Zm0-11a4.5,4.5,0,1,0,4.5,4.5A4.51,4.51,0,0,0,8.5,18.65Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M27.5,29.65a6.51,6.51,0,0,1-6.5-6.5,6.5,6.5,0,0,1,13,0A6.51,6.51,0,0,1,27.5,29.65Zm0-11a4.5,4.5,0,1,0,4.5,4.5A4.51,4.51,0,0,0,27.5,18.65Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M19,24.66H8a1,1,0,0,1-.89-1.45l5-10,1.78.9L9.62,22.73H19Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 13, "y": 12.68, "width": 11, "height": 1.91, "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M28,24.66a1,1,0,0,1-.94-.66L22.29,10.66H20a1,1,0,0,1-1-1,1,1,0,0,1,1-.93h3a.94.94,0,0,1,.94.6l5,14a1,1,0,0,1-.6,1.27A1,1,0,0,1,28,24.66Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M13,14.66a1,1,0,0,1-.71-.29l-1.7-1.71H8a1,1,0,0,1-1-1,.94.94,0,0,1,1-1h3a1.08,1.08,0,0,1,.75.27l2,2a1,1,0,0,1,0,1.41A1,1,0,0,1,13,14.66Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BicycleLine;
