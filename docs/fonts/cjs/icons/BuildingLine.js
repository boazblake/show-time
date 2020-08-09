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
var BuildingLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "building-line"), mithril_1.default("path", { "d": "M31,8H23v2h8V31H23v2H33V10A2,2,0,0,0,31,8Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M19.88,3H6.12A2.12,2.12,0,0,0,4,5.12V33H22V5.12A2.12,2.12,0,0,0,19.88,3ZM20,31H17V28H9v3H6V5.12A.12.12,0,0,1,6.12,5H19.88a.12.12,0,0,1,.12.12Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 8, "y": 8, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 12, "y": 8, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("rect", { "x": 16, "y": 8, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 8, "y": 13, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 12, "y": 13, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 16, "y": 13, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-8" }), mithril_1.default("rect", { "x": 8, "y": 18, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-9" }), mithril_1.default("rect", { "x": 12, "y": 18, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-10" }), mithril_1.default("rect", { "x": 16, "y": 18, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-11" }), mithril_1.default("rect", { "x": 8, "y": 23, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-12" }), mithril_1.default("rect", { "x": 12, "y": 23, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-13" }), mithril_1.default("rect", { "x": 16, "y": 23, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-14" }), mithril_1.default("rect", { "x": 23, "y": 13, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-15" }), mithril_1.default("rect", { "x": 27, "y": 13, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-16" }), mithril_1.default("rect", { "x": 23, "y": 18, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-17" }), mithril_1.default("rect", { "x": 27, "y": 18, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-18" }), mithril_1.default("rect", { "x": 23, "y": 23, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-19" }), mithril_1.default("rect", { "x": 27, "y": 23, "width": 2, "height": 2, "class": "clr-i-outline clr-i-outline-path-20" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BuildingLine;
