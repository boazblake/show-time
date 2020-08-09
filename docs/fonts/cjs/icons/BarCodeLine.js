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
var BarCodeLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bar-code-line"), mithril_1.default("path", { "d": "M5,7A1,1,0,0,0,4,8V30a1,1,0,0,0,2,0V8A1,1,0,0,0,5,7Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M9,7A1,1,0,0,0,8,8V26a1,1,0,0,0,2,0V8A1,1,0,0,0,9,7Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M13,7a1,1,0,0,0-1,1V26a1,1,0,0,0,2,0V8A1,1,0,0,0,13,7Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M17,7a1,1,0,0,0-1,1V26a1,1,0,0,0,2,0V8A1,1,0,0,0,17,7Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M21,7a1,1,0,0,0-1,1V26a1,1,0,0,0,2,0V8A1,1,0,0,0,21,7Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M25,7a1,1,0,0,0-1,1V26a1,1,0,0,0,2,0V8A1,1,0,0,0,25,7Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M29,7a1,1,0,0,0-1,1V26a1,1,0,0,0,2,0V8A1,1,0,0,0,29,7Z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("path", { "d": "M33,7a1,1,0,0,0-1,1V30a1,1,0,0,0,2,0V8A1,1,0,0,0,33,7Z", "class": "clr-i-outline clr-i-outline-path-8" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BarCodeLine;
