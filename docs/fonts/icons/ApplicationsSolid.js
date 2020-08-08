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
var ApplicationsSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "applications-solid"), mithril_1.default("rect", { "x": 4, "y": 4, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 4, "y": 15, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 4, "y": 26, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 15, "y": 4, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("rect", { "x": 15, "y": 15, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("rect", { "x": 15, "y": 26, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-6" }), mithril_1.default("rect", { "x": 26, "y": 4, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-7" }), mithril_1.default("rect", { "x": 26, "y": 15, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-8" }), mithril_1.default("rect", { "x": 26, "y": 26, "width": 6, "height": 6, "class": "clr-i-solid clr-i-solid-path-9" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ApplicationsSolid;
