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
var CrosshairsLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "crosshairs-line"), mithril_1.default("path", { "d": "M18,29A11,11,0,1,1,29,18,11,11,0,0,1,18,29ZM18,9a9,9,0,1,0,9,9A9,9,0,0,0,18,9Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M18,23a5,5,0,1,1,5-5A5,5,0,0,1,18,23Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,18,15Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M18,9a1,1,0,0,1-1-1V2.8a1,1,0,0,1,2,0V8A1,1,0,0,1,18,9Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M18,34a1,1,0,0,1-1-1V28a1,1,0,0,1,2,0v5A1,1,0,0,1,18,34Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M8,19H3.17a1,1,0,0,1,0-2H8a1,1,0,0,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M33.1,19H28a1,1,0,0,1,0-2h5.1a1,1,0,0,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CrosshairsLine;
