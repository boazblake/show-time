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
var BulletListLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "bullet-list-line"), mithril_1.default("circle", { "cx": 5.21, "cy": 9.17, "r": 2, "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("circle", { "cx": 5.21, "cy": 17.17, "r": 2, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("circle", { "cx": 5.21, "cy": 25.17, "r": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M32.42,9a1,1,0,0,0-1-1H10v2H31.42A1,1,0,0,0,32.42,9Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M31.42,16H10v2H31.42a1,1,0,0,0,0-2Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M31.42,24H10v2H31.42a1,1,0,0,0,0-2Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BulletListLine;
