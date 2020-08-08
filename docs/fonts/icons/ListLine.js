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
var ListLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "list-line"), mithril_1.default("rect", { "x": 15, "y": 8, "width": 9, "height": 2, "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 15, "y": 12, "width": 9, "height": 2, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 15, "y": 16, "width": 9, "height": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 15, "y": 20, "width": 9, "height": 2, "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("rect", { "x": 15, "y": 24, "width": 9, "height": 2, "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 11, "y": 8, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 11, "y": 12, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 11, "y": 16, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-8" }), mithril_1.default("rect", { "x": 11, "y": 20, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-9" }), mithril_1.default("rect", { "x": 11, "y": 24, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-10" }), mithril_1.default("path", { "d": "M28,2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2Zm0,30H8V4H28Z", "class": "clr-i-outline clr-i-outline-path-11" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ListLine;
