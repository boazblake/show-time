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
var SwitchLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "switch-line"), mithril_1.default("path", { "d": "M5.71,14H20.92V12H5.71L9.42,8.27A1,1,0,1,0,8,6.86L1.89,13,8,19.14a1,1,0,1,0,1.42-1.4Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 23, "y": 12, "width": 3, "height": 2, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 28, "y": 12, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M27.92,17.86a1,1,0,0,0-1.42,1.41L30.21,23H15v2H30.21L26.5,28.74a1,1,0,1,0,1.42,1.4L34,24Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("rect", { "x": 10, "y": 23, "width": 3, "height": 2, "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 6, "y": 23, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SwitchLine;
